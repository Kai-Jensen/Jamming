import React from 'react';
import TrackList from './Tracklist';

function SearchResults({SearchResultTracks, onAdd}) {
  

 
  if(SearchResultTracks.length === 0) {
    return (
      <div>
        <h2>Search Results</h2>
        <p>Please search for some songs!!</p>
      </div>
    )
  } else {
  return (
   <div>
    <h2>Search Results</h2>
    <TrackList tracks={SearchResultTracks} onAdd={onAdd}/>
    </div>
 )}
}

export default SearchResults;
