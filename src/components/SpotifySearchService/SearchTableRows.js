import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const SearchTableRows = ({ id, name, artist, album, duration, image, uri, 
  saveSong, handleCallGetPlaylists, playSong, pauseSong, resumeSong, setUriSelected }) => {

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
  };

  const handlePauseSongButtonClick = () => {
    pauseSong();
  };

  return (
    <tr>

      <td className="tdInfoRow">
        <div className="search-result">

          <img src={image} alt={album} style={{ width: "100px", height: "100px" }} />

          <div className="fit-objects">
            <div className="margin-1rem" style={{fontWeight: 'bolder' }}>{name} ·</div>
            <div className="margin-1rem">{artist} ·</div>
            <div className="margin-1rem">{`${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`} ·</div>
            <div className="margin-1rem">{album}</div>
          </div>

        </div>
      </td>
      <th className="tdTableRow">
        <button style={{marginRight: '0.1rem' }} className="btn btn-danger" onClick={handleSaveSongButtonClick}><FontAwesomeIcon icon={faHeart} /></button>
        <button className="btn btn-info " onClick={handleAddSongtoPlaylistButtonClick}><FontAwesomeIcon icon={faFolderPlus} /></button>
        <button id="togglePlay" className="btn btn-success " onClick={handlePlaySongButtonClick}><FontAwesomeIcon icon={faPlay} /></button>
        <button className="btn btn-success " onClick={handlePauseSongButtonClick}><FontAwesomeIcon icon={faPause} /></button>
        <button className="btn btn-primary" onClick={resumeSong}><FontAwesomeIcon icon={faPlay} /></button>
      </th>
    </tr>
  );
};

export default SearchTableRows;
