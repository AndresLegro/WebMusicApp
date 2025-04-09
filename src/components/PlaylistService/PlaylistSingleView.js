import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlay } from "@fortawesome/free-solid-svg-icons";
import UpdatePlaylistForm from "./UpdatePlaylistForm";
import Swal from 'sweetalert2';
import { useSearch } from "../SearchContext";

const PlaylistSingleView = ({ playlistSelected, playSong, pauseSong, resumeSong, setCallGetPlaylist }) => {

  const {backEndUrl} = useSearch();

  const { id, image, name, description, author, songsAmount, songs } = playlistSelected;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (playlistSelected) {
      const { name, description } = playlistSelected;
      setFormData({ name, description });
    }
  }, [playlistSelected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePlaylist = async (id) => {
    try {

      const filteredFormData = Object.entries(formData)
      .filter(([key, value]) => value !== "")
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

      const response = await fetch(`${backEndUrl}/playlist/update/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(filteredFormData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsEditing(false);
      } else {
        Swal.fire("Error", "Debes escribir algo para actualizar la playlist!");
      }
    } catch (error) {
      Swal.fire("Error", "Error de red!");
    }
  }

  const deletePlaylist = async (id) => {
    try {
      await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Estás seguro de eliminar la playlist: '${name}'?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
        
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`${backEndUrl}/playlist/delete/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            Swal.fire({
              title: 'Exito',
              text: `Boraste a : '${name}'`,
              icon: 'success',
            })
            setCallGetPlaylist(false);
          } else {
            Swal.fire("Error", "Error al eliminar la playlist!");
          }
        }
      });
    } catch (error) {
      Swal.fire("Error", "Error de red!");
    }
  };

  const handlePlaySong = ()=> {
    playSong();
  }
  
  return (

    <div className="container-singleView-playlist">
      <div className="buttons-singleView-playlist">

        <button className="edit-button-playlist btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faPen} />
          <span style={{ marginLeft: "0.5rem" }}>Editar</span>
        </button>
        <button className="delete-button-playlist btn" onClick={() => deletePlaylist(id)}>
          <FontAwesomeIcon icon={faTrash} />
          <span style={{ marginLeft: "0.5rem" }}>Borrar</span>
        </button>

      </div>
      
      <h2 className="h2-singleView-playlist">Esto es " {playlistSelected.name} "</h2>

      <div className={`playlist-general-view ${isEditing ? 'blur-background' : ''}`}>
        <div className="content-single-playlist-view">

          
          <img
            src={image}
            alt={name}
            className="playlist-song-image"
          />
          <div className="playlist-info">
            <div style={{ fontWeight: 'bolder', fontSize: "22px", marginBlockEnd: "0.5rem" }}>{name}</div>
            <div style={{ marginBlockEnd: '0.5rem' }}>{author}</div>
            <div style={{ marginBlockEnd: '0.5rem', marginLeft: "1rem", textAlign: "center" }}>{description}</div>
            <div style={{ marginBlockEnd: '0.5rem' }}>{songsAmount} Pistas</div>
          </div>
        </div>
    
      </div>

      <div className="songs-playlist-info">
          {songs.map((song) =>
            <div className="search-result" key={song.id}>
              <img src={song.image} alt={song.name}  />
              <div className="margin-1rem" style={{ fontWeight: 'bolder', marginLeft: "1rem" }}>{song.name} ·</div>
              <div className="margin-1rem">{song.author} ·</div>
              <div className="margin-1rem">{song.duration}</div>
              <button id="togglePlay" className="btn btn-success playback-buttons" onClick={handlePlaySong}><FontAwesomeIcon icon={faPlay} /></button>
            </div>
          )}
        </div>

      {isEditing && (
        <div className={`${isEditing ? 'blur-background' : ''}`}>
            <UpdatePlaylistForm
              updatePlaylist={updatePlaylist}
              formData={formData}
              playlistSelected={playlistSelected}
              handleInputChange={handleInputChange}
              setIsEditing={setIsEditing}
            />
        </div>
      )}
    </div>
  )


};

export default PlaylistSingleView;
