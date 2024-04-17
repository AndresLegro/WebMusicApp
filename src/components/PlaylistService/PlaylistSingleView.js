import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdatePlaylistForm from "./UpdatePlaylistForm";
import Swal from 'sweetalert2';


const PlaylistSingleView = ({ playlistSelected }) => {

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

      const response = await fetch(`http://localhost:8080/playlist/update/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(filteredFormData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Endpoint builded", response)
        console.log(data);
        setIsEditing(false);
      } else {
        console.error("Debes escribir algo para actualizar tu playlist", response.status);
      }
    } catch (error) {
      console.error("Error de red:", error);
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
          const response = await fetch(`http://localhost:8080/playlist/delete/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            console.log("Playlist eliminada con éxito");
          } else {
            console.error("Error al eliminar la playlist:", response.status);
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (

    <div className="">
      <button className="edit-button-playlist btn" onClick={() => setIsEditing(true)}>
        <FontAwesomeIcon icon={faPen} />
        <span style={{ marginLeft: "0.5rem" }}>Editar</span>
      </button>
      <button className="delete-button-playlist btn" onClick={() => deletePlaylist(id)}>
        <FontAwesomeIcon icon={faTrash} />
        <span style={{ marginLeft: "0.5rem" }}>Borrar</span>
      </button>
      <h2 className="h2">Esto es " {playlistSelected.name} "</h2>

      <div className={`playlist-general-view ${isEditing ? 'blur-background' : ''}`}>
        <div className="content-single-playlist-view">
          <img
            src={image}
            alt={name}
            className="playlist-song-image"
          />
          <div className="playlist-info">
            <div style={{ fontWeight: 'bolder', fontSize: "22px", marginBlockEnd: "0.5rem" }}>{name}</div>
            <div style={{ marginBlockEnd: '0.5rem', marginLeft: "1rem", textAlign: "center" }}>{description}</div>
            <div style={{ marginBlockEnd: '0.5rem' }}>{author}</div>
            <div style={{ marginBlockEnd: '0.5rem' }}>{songsAmount} Pistas</div>
          </div>
        </div>
        <div className="songs-playlist-info">
          {songs.map((song) =>
            <div className="search-result" key={song.id}>
              <img src={song.image} alt={song.name} style={{ width: "150px", height: "150px" }} />
              <div className="margin-1rem" style={{ fontWeight: 'bolder', marginLeft: "1rem" }}>{song.name} ·</div>
              <div className="margin-1rem">{song.author} ·</div>
              <div className="margin-1rem">{song.duration}</div>
            </div>
          )}
        </div>
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
