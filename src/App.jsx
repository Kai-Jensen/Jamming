import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import './App.css'

function App() {
  const dummyTracks = [
    {
      id: 1,
      songTitle: 'Dreams',
      songArtist: 'Fleetwood Mac',
      imgSrc: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      songTitle: 'Blinding Lights',
      songArtist: 'The Weeknd',
      imgSrc: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
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
  console.log('form submitted!')
  setSearch('')
  }

  return (
    <div className="container">
      <h1>Spotify Playlist Maker</h1>
      <SearchBar search={search} onSearchSubmit={handleSearchSubmit} onSearchChange={handleSearchChange}/>
      <div className="main">
      <SearchResults SearchResultTracks={dummyTracks}/>
      <Playlist playlistTracks={dummyTracks}/>
      </div>
    </div>
  );
}

export default App;
