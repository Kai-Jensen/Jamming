import React from 'react';
import TrackList from './Tracklist';
import './SearchResults.css'

function SearchResults({SearchResultTracks, onAdd}) {
  

 
  if(SearchResultTracks.length === 0) {
    return (
      <div>
        <p className="search-results-h2">Search Results</p>
        <p>Please search for some songs!!</p>
      </div>
    )
  } else {
  return (
   <div>
    <p className="search-results-h2">Search Results</p>
    <TrackList tracks={SearchResultTracks} onAdd={onAdd}/>
    </div>
 )}
}

export default SearchResults;
