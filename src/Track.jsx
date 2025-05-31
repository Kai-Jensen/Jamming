import React from 'react';
import './Track.css';

function Track({ track, onAdd, onRemove }) {
  return (
    <div className="track">
      <img 
        src={track.imgSrc} 
        alt={`${track.songTitle} album art`} 
        className="track-image"
      />
      <div className="track-info">
        <h3 className="track-title">{track.songTitle}</h3>
        <h4 className="track-artist">{track.songArtist}</h4>
        {onAdd && (
        <button className="add" onClick={() => onAdd(track)}>Add to Playlist</button>
      )}
      {onRemove && (
        <button className="remove" onClick={() => onRemove(track)}>Remove from Playlist</button>
      )}
      </div>
    </div>
  );
}

export default Track;
