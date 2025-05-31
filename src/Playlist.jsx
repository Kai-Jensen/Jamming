import React from 'react';
import TrackList from './Tracklist';
import SaveButton from './SaveButton';

function Playlist({playlistTracks}) {

 return (
   <div>
    <h2>Your Playlist</h2>
    <TrackList tracks={playlistTracks}/>
    <SaveButton />
    </div>
 )
}

export default Playlist;
