import React from 'react';
import './Track.css';

function Track({ track }) {
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
      </div>
    </div>
  );
}

export default Track;
