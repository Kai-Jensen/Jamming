import React from 'react';
import TrackList from './Tracklist';

function SearchResults({SearchResultTracks}) {
  

 return (
   <div>
    <h2>Search Results</h2>
    <TrackList tracks={SearchResultTracks}/>
    </div>
 )
}

export default SearchResults;
