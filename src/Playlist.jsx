import React from 'react';
import TrackList from './Tracklist';
import SaveButton from './SaveButton';

function Playlist({playlistTracks, onRemove}) {

  if(playlistTracks.length === 0) {
    return (
      <div>
        <h2>Your Playlist</h2>
        <p>Please add some songs!!</p>
      </div>
    )
  } else {
 return (
   <div>
    <h2>Your Playlist</h2>
    <TrackList tracks={playlistTracks} onRemove={onRemove}/>
    <SaveButton />
    </div>
 )}
}

export default Playlist;
