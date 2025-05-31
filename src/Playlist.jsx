import React from 'react';
import TrackList from './Tracklist';
import SaveButton from './SaveButton';

function Playlist({playlistTracks, onRemove, onCreate}) {

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
    <SaveButton onCreate={onCreate}/>
    </div>
 )}
}

export default Playlist;
