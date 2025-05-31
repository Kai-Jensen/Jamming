import React from 'react';
import TrackList from './Tracklist';
import SaveButton from './SaveButton';
import './Playlist.css'

function Playlist({playlistTracks, onRemove, onCreate, playlistName, onPlaylistNameChange}) {

  if(playlistTracks.length === 0) {
    return (
      <div>
        
        <input className="playlist-title-input" placeholder='Your Playlist' value={playlistName} onChange={onPlaylistNameChange}/>
        <p>Please add some songs!!</p>
      </div>
    )
  } else {
 return (
   <div>
    <input className="playlist-title-input" placeholder='Your Playlist' value={playlistName} onChange={onPlaylistNameChange}/>
    <TrackList tracks={playlistTracks} onRemove={onRemove}/>
    <SaveButton onCreate={onCreate}/>
    </div>
 )}
}

export default Playlist;
