import React from 'react';
import SearchButton from './SearchButton';
import './SearchBar.css'

function SearchBar({search, onSearchSubmit, onSearchChange}) {

 return (
   <div>
    <form onSubmit={onSearchSubmit} >
      <label htmlFor="search">Search:</label>
      <input name="search" placeholder="Search for song title or artist" value={search} onChange={onSearchChange}></input>
      <SearchButton  search={search}/>
    </form>
    </div>
 )
}

export default SearchBar;
