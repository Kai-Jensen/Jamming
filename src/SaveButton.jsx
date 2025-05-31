import React from 'react';
import './SearchButton.css'

function SaveButton({onCreate}) {
 return (
    <button className="SearchButton" onClick={onCreate}>Create Playlist</button>
 )
}

export default SaveButton;
