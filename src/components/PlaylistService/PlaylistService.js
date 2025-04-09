import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; 
import PlaylistSingleView from "./PlaylistSingleView";
import { Link } from "react-router-dom";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useSearch } from "../SearchContext";
import Swal from 'sweetalert2';
import MusicPlayer from "../../shared/MusicPlayer/MusicPlayer"; // Importar el componente MusicPlayer
// import Swal from 'sweetalert2';

const PlaylistService = (playSong, pauseSong, resumeSong) =>{
  
    const [idPlaylistSelected, setIdPlaylistSelected ]= useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [playlistSelected, setPlaylistSelected ]= useState(null);
    const [callGetPlaylist, setCallGetPlaylist ]= useState(false);
    const [callCreatePlaylist, setCallCreatePlaylist ]= useState(false);
    const {backEndUrl} = useSearch();

    const [formData, setFormData] = useState({
        name: "",
        description: "Sin descripcion",
        image: ""
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const getAllPlaylist = async () => {
        try {
            const response = await fetch(`${backEndUrl}/playlist/getAllPlaylist`);
            if(response.ok){
                const data = await response.json();            
                setPlaylists(data);
            }else{
                Swal.fire("Error", "Error al iniciar sesión en Spotify!");
            }
        } catch (error) {
            Swal.fire("Error", "Error de red!");
        }     
    }

    useEffect(() => {

      const timeOut = setTimeout(()=> {
        getAllPlaylist();
      }, 600)

      return () => clearTimeout(timeOut);
    }, []);

    const createPlaylist = async () => {

        if(formData.name === "" || formData.image === ""){
            Swal.fire("Error", "Faltan campos por llenar!");
        }

        try {
            const response = await fetch(`${backEndUrl}/playlist/create`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                  'Content-Type': 'application/json'
                }
              });

            if(response.ok){
                setCallCreatePlaylist(true);
            }else{
              Swal.fire("Error", "Error al iniciar sesión en Spotify!");
            }
        } catch (error) {
            Swal.fire("Error", "Error de red!");
        }     
    }

    const getPlaylist = async (playlistId) => {
        try {
            const response = await fetch(`${backEndUrl}/playlist/getPlaylist/${playlistId}`);
            if(response.ok){
                const data = await response.json();
                setPlaylistSelected(data);
                setCallGetPlaylist(true);
            }else{
              Swal.fire("Error", "Error al iniciar sesión en Spotify!");
            }
        } catch (error) {
          Swal.fire("Error", "Error de red!");
        }     
    }

    const handlePlaylistClick = (playlistId) => {
        setIdPlaylistSelected(playlistId);
        getPlaylist(playlistId);
    }


    return (
      <div className="">
        {callGetPlaylist ? (
          <div style={{ marginTop: "2rem", marginLeft: "3rem" }}>
            <button className="back-button-playlist btn" type="button" onClick={() => setCallGetPlaylist(false)}><FontAwesomeIcon icon={faArrowLeft} /></button>

            {playlistSelected ? (
              <PlaylistSingleView
                playlistSelected={playlistSelected}
                playSong={playSong}
                pauseSong={pauseSong}
                resumeSong={resumeSong}
                setCallGetPlaylist={setCallGetPlaylist}
              />
            ) : (
              <p>Cargando playlist...</p>
            )}

          </div>

          ) : (
            <>
              <h2 className="h2-singleView-playlist">Tus Playlist</h2>
              <button className="add-button-playlist btn" onClick={() => setCallCreatePlaylist(true)}>
                <FontAwesomeIcon icon={faPlus} />
                <span style={{ marginLeft: "0.5rem" }}>Crear</span>
              </button>

              <div className="playlist-general-view">
                
              {callCreatePlaylist && (
                  <div className={`${callCreatePlaylist ? 'blur-background' : ''}`}>
                    <CreatePlaylistForm
                      createPlaylist={createPlaylist}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      setCallCreatePlaylist={setCallCreatePlaylist}
                    />
                  </div>

                )}

            {playlists.length === 0 ? (
              <p>No tienes playlists aún.</p>
            ) : (
              playlists.map((playlist) => (
                <div key={playlist.id}>
                  <Link to="/playlist">
                    <button
                      type="button"
                      className="buttons-playlist-service"
                      onClick={() => handlePlaylistClick(playlist.id)}
                    >
                      <div className="conten-playlist-view">
                        <img
                          src={playlist.image}
                          alt={playlist.name}
                          className="playlist-img"
                        />
                        <div style={{ fontWeight: "bolder" }}>{playlist.name}</div>
                        <div>{playlist.songsAmount} Pistas</div>
                      </div>
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );

}

export default PlaylistService;