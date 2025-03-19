import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; 
import PlaylistSingleView from "./PlaylistSingleView";
import { Link } from "react-router-dom";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useSearch } from "../SearchContext";
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
        author:"",
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
                console.log(playlists);
            }else{
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }     
    }

    useEffect(() => {
      getAllPlaylist();
    }, []);

    const createPlaylist = async () => {

        if(formData.name === "" || formData.author === "" || formData.image === ""){
            console.error("Faltan datos para crear la playlist");
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
                console.log("Endpoint builded", response)
                console.log("Datos enviados", formData)
                setCallCreatePlaylist(true);
            }else{
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }     
    }

    const getPlaylist = async (playlistId) => {
        try {
            const response = await fetch(`${backEndUrl}/playlist/getPlaylist/${playlistId}`);
            if(response.ok){
                const data = await response.json();
                //console.log("Endpoint builded", response)
                //console.log(data);
                setPlaylistSelected(data);
                setCallGetPlaylist(true);
            }else{
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
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
              />
            ) : (
              <p>Cargando playlist...</p>
            )}

          </div>

          ) : (
            <>
              <h2 className="h2">Tus Playlist</h2>
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
                          style={{ width: "150px", height: "150px", marginBlockEnd: "1rem" }}
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