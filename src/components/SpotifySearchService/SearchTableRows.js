import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";

const SearchTableRows = ({ index ,id, name, artist, album, duration, image, uri, 
  saveSong, handleCallGetPlaylists, playSong, setUriSelected, setCurrentSongIndex }) => {

  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);

  const handleSaveSongButtonClick = () => {
    saveSong(id);
  };

  const handleAddSongtoPlaylistButtonClick = () => {
    handleCallGetPlaylists(id)
  };

  const handlePlaySongButtonClick = () => {
    playSong(uri);
    setUriSelected(uri);
    setCurrentSongIndex(index)
  };

  return (
    <tr>

      <td className="tdInfoRow">
        <div className="search-result">

          <img src={image} alt={album} />

          <div className="fit-objects">
            <div className="margin-1rem" style={{fontWeight: 'bolder' }}>{name}</div>
            <div className="margin-1rem">{artist}</div>
            <div className="margin-1rem">{`${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`}</div>
            <div className="margin-1rem">{album}</div>
          </div>

        </div>
      </td>
      <th className="tdTableRow">
        <button id="togglePlay" className="btn btn-success playback-buttons search-buttons" onClick={handlePlaySongButtonClick}><FontAwesomeIcon icon={faPlay} /></button>
        <button style={{ marginRight: '0.1rem' }} className="btn btn-danger search-buttons" onClick={handleSaveSongButtonClick}><FontAwesomeIcon icon={faHeart} /></button>
        <button className="btn btn-info search-buttons" onClick={handleAddSongtoPlaylistButtonClick}><FontAwesomeIcon icon={faFolderPlus} /></button>
      </th>
    </tr>
  );
};

export default SearchTableRows;
