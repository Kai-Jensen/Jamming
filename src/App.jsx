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

  const dummyTracks = [
    {
      id: 1,
      uri: 1,
      songTitle: 'Dreams',
      songArtist: 'Fleetwood Mac',
      imgSrc: 'https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7'
    },
    {
      id: 2,
      uri: 2,
      songTitle: 'Blinding Lights',
      songArtist: 'The Weeknd',
      imgSrc: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      uri: 3,
      songTitle: 'Mr. Brightside',
      songArtist: 'The Killers',
      imgSrc: 'https://via.placeholder.com/100'
    }
  ];
  const [search, setSearch] = useState('');

  function handleSearchChange(e) {
  setSearch(e.target.value)
  }
  function handleSearchSubmit(e) {
  e.preventDefault();
  setSearch('')
  setRemovedFromCurrentSearch([]);
  }

  const [playlistName, setPlaylistName] = useState('Your Playlist');

  function handleNameChange(e) {
    setPlaylistName(e.target.value)
    }

  const [searchResults, setSearchResults] = useState(dummyTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [removedFromCurrentSearch, setRemovedFromCurrentSearch] = useState([]);

  function addSongToPlaylist(track) {
    setPlaylistTracks(prevPlaylist => [track,...prevPlaylist]);
    setRemovedFromCurrentSearch(prevSearch => [track,...prevSearch]);
    setSearchResults(prevResults =>
      prevResults.filter(t => t.id !== track.id)
    );
  }

  function removeSongFromPlaylist(track) {
    setPlaylistTracks(prevResults =>
      prevResults.filter(t => t.id !== track.id)
    );
    removedFromCurrentSearch.forEach(t => {
      if(t.id === track.id) {
        setSearchResults(prevSearchResults => [track,...prevSearchResults]);
      }
    });
  }

  function handlePlaylistCreate() {
    const uri = playlistTracks.map(track => track.uri)
    console.log("we're making a playlist baby!") //Add API Data
    setSearchResults([]);
    setPlaylistTracks([]);
    setRemovedFromCurrentSearch([]);
    setPlaylistName('Your Playlist');
  }

  return (
    <div className="container">
      <h1>Spotify Playlist Maker</h1>
      {!token ? (
        <Login />
      ) : (
        <div>
          <p>You're logged in! Access token: {token.slice(0, 10)}...</p>
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
