import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import './App.css'
import Login from './Login'
import { handleRedirect, getStoredToken } from './Spotify';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const doAuth = async () => {
      const accessToken = await handleRedirect();
      if (accessToken) {
        setToken(accessToken);
      } else {
        const stored = getStoredToken();
        if (stored) setToken(stored);
      }
    };

    doAuth();
  }, []);
  const [search, setSearch] = useState('');

  

  async function submitSearch(query) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album%2Ctrack&limit=10`;
    
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(url, { headers });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const simplifiedTracks = data.tracks.items.map(track => ({
        id: track.id,
        songTitle: track.name,
        songArtist: track.artists[0].name,
        imgSrc: track.album.images[0]?.url || 'default_image_url',
        uri: track.uri
      }));
      setSearchResults(simplifiedTracks)
      return simplifiedTracks;
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error; 
    }
  }

  function handleSearchChange(e) {
  setSearch(e.target.value)
  }
  async function handleSearchSubmit(e) {
  e.preventDefault();
  try {
    await submitSearch(search);
  } catch (error) {
    console.error('Search failed:', error.message);
    alert('Your session has expired. Please log in again.');
    setToken(null);
  }
  setSearch('')
  }

  const [playlistName, setPlaylistName] = useState('Your Playlist');

  function handleNameChange(e) {
    setPlaylistName(e.target.value)
    }

  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);


  function addSongToPlaylist(track) {
    const trackExists = playlistTracks.some(t => t.id === track.id);
  
    if (!trackExists) {
      setPlaylistTracks(prevPlaylist => [track, ...prevPlaylist]);
    }
    setSearchResults(prevResults =>
      prevResults.filter(t => t.id !== track.id)
    );
  }
  

  function removeSongFromPlaylist(track) {
    setPlaylistTracks(prevResults =>
      prevResults.filter(t => t.id !== track.id)
    );
    const searchExists = searchResults.some(t => t.id === track.id);
    if (!searchExists) {
      setSearchResults(prevSearchResults => [track,...prevSearchResults]);
    }
  }
  async function getUser() {
    const url = `https://api.spotify.com/v1/me`;
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const userId = data.id;
      return userId;
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error; 
    }
  }
  async function createPlaylist(userId, playlistName) {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

  const body = JSON.stringify({
    "name": playlistName,
    public: false,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to create playlist: ${response.status}`);
    }

    const data = await response.json();
    return data.id; 
  } catch (error) {
    setToken(null);
    console.error('Error creating playlist:', error);
    throw error;
  }
  }
  async function addTracksToPlaylist(playlistId, uris) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

  const body = JSON.stringify({
      "uris": uris,
      "position": 0
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to create playlist: ${response.status}`);
    }

    const data = await response.json();
    return data.id; 
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
  }

  async function handlePlaylistCreate() {
    try {
      const userId = await getUser();
      const playlistId = await createPlaylist(userId, playlistName); 
      const uris = playlistTracks.map(track => track.uri);
      await addTracksToPlaylist(playlistId, uris);
      alert("Playlist created!")
      setSearchResults([]);
      setPlaylistTracks([]);
      setPlaylistName('Your Playlist');
      console.log("Playlist successfully created!");
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  }
  

  return (
    <div className="container">
      <h1>Spotify Playlist Maker</h1>
      {!token ? (
        <Login />
      ) : (
        <div>
        <SearchBar search={search} onSearchSubmit={handleSearchSubmit} onSearchChange={handleSearchChange}/>
        <div className="main">
        <SearchResults SearchResultTracks={searchResults} onAdd={addSongToPlaylist}/>
        <Playlist playlistTracks={playlistTracks} onRemove={removeSongFromPlaylist} onCreate={handlePlaylistCreate} playlistName={playlistName} onPlaylistNameChange={handleNameChange}/>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
