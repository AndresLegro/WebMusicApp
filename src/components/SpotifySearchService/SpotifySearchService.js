/* global Spotify */
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay, faPause, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../SearchContext";

const SpotifySearchService = () => {
    const { responseJson, setResponseJson } = useSearch();
    const [playlists, setPlaylists] = useState([]);
    const [callGetPlaylist, setCallGetPlaylist] = useState(false);
    const [idPlaylistSelected, setIdPlaylistSelected] = useState(null);
    const [idSongSelected, setIdSongSelected] = useState(null);
    const [uriSelected, setUriSelected] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [displayResumeIcon, setDisplayResumeIcon] = useState(false);
    const [displayPauseIcon, setDisplayPauseIcon] = useState(true);
    const {backEndUrl} = useSearch();

   const accessToken = localStorage.getItem("spotifyToken");

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });


            // Ready
            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                Swal.fire("Error", "Device ID has gone offline!");
            });

            player.connect();

        };
    }, [accessToken]);

    const playSong = async (uri) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uris: [uri]
                })
            });

            if (response.ok) {
                console.log("La canción se está reproduciendo");
            } else {
                Swal.fire("Error", "Error al reproducir la canción:", response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };

    const pauseSong = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                console.log("La canción se pausó");
            } else {
                Swal.fire("Error", "Error al pausar la canción:", response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };

    const resumeSong = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                console.log("La canción se ha resumido");
            } else {
                Swal.fire("Error", "Error al reanudar la canción:", response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };

    const nextSong = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                if (currentSongIndex < responseJson.length - 1) {
                    setCurrentSong(responseJson[currentSongIndex + 1]); 
                    setCurrentSongIndex(currentSongIndex + 1); 
                    playSong(responseJson[currentSongIndex + 1].uri);
                } else {
                    Swal.fire("Error", "No hay más canciones disponibles!");
                    playSong(responseJson[9].uri);
                }
            } else {
                Swal.fire("Error", "Error al pasar de canción:", response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };
    
    const previousSong = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                if (currentSongIndex > 0) {
                    setCurrentSong(responseJson[currentSongIndex - 1]); 
                    setCurrentSongIndex(currentSongIndex - 1); 
                    playSong(responseJson[currentSongIndex - 1].uri);
                } else {
                    Swal.fire("Error", "No hay más canciones disponibles!");
                }
            } else {
                Swal.fire("Error", "Error al pasar de canción:", response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };
    

    const searchSong = async (searchTerm) => {
        try {
            const response = await fetch(`${backEndUrl}/search/${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                const uri = data[0].uri;
                setResponseJson(data);
                setUriSelected(uri); 
                setCurrentSong(data[0]); 
            } else {
                Swal.fire("Error", "Tu sesion caduco, inicia de sesion nuevamente!");
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }     
    };

    const saveSong = async (idSong) => {
        try {
            const response = await fetch(`${backEndUrl}/songs/save/${idSong}`, {
                method: 'POST'
            });

            if (response.status === 409){
                Swal.fire("Error", "Ya guardaste esta cancion!");
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };

    const addSongtoPlaylist = async () => {
        try {
            const response = await fetch(`${backEndUrl}/playlist/addSong/${idSongSelected}/${idPlaylistSelected}`, {
                method: 'POST'
            });

            if (response.ok) {
                setIdPlaylistSelected(null);
            } else if (response.status === 409){
                Swal.fire("Error", "Tu sesion caduco, inicia de sesion nuevamente!");
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }
    };

    const getAllPlaylist = async () => {
        try {
            const response = await fetch(`${backEndUrl}/playlist/getAllPlaylist`);
            if(response.ok){
                const data = await response.json();            
                setPlaylists(data);
            } else {
                Swal.fire("Error", "Error!");
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor!");
        }     
    };

    const handleCallGetPlaylists  = (idSong) => {
        setCallGetPlaylist(true);
        getAllPlaylist();
        setIdSongSelected(idSong);
    };

    const openModalAndSetPlaylist  = (playlistId) => {
        setIdPlaylistSelected(playlistId);
    };

    const handleResumeOrPauseSong = () => {
        if (displayPauseIcon === true) {
            setDisplayPauseIcon(false);
            setDisplayResumeIcon(true);
            pauseSong();
        }else{
            setDisplayPauseIcon(true);
            setDisplayResumeIcon(false);
            resumeSong();
        }
    }

    useEffect(() => {
        if (idSongSelected !== null && idPlaylistSelected !== null) {
            addSongtoPlaylist(); 
            setCallGetPlaylist(false);

            setIdSongSelected(null);
            setIdPlaylistSelected(null);
        }
    }, [idSongSelected, idPlaylistSelected]); // Observar cambios en idSongSelected e idPlaylistSelected


    return(
        <div className="child-container">
            <h2 className="h2">Buscar Canciones</h2>

            <SearchForm 
                onSearch={searchSong}
            />
            <SearchTable
                saveSong ={saveSong}
                addSongtoPlaylist= {addSongtoPlaylist}
                handleCallGetPlaylists={handleCallGetPlaylists}
                idPlaylistSelected={idPlaylistSelected}
                playSong={playSong}
                setUriSelected={setUriSelected}
                setCurrentSongIndex={setCurrentSongIndex}
            />

            {callGetPlaylist && (
                <div className="select-playlist-to-add-song">
                    <div className="playlist-container">
                        {playlists.map((playlist) => (
                            <div className="playlist-item" key={playlist.id}>
                                <button
                                    type="button"
                                    className="buttons-select-song-to-add-playlist-service"
                                    onClick={() => openModalAndSetPlaylist(playlist.id)}
                                >
                                    <div className="content-playlist-view">
                                        <img
                                            src={playlist.image}
                                            alt={playlist.name}
                                            style={{ width: "100px", height: "100px", marginBottom: "1rem" }}
                                        />
                                        <div style={{ fontWeight: 'bolder' }}>{playlist.name}</div>
                                        <div>{playlist.songsAmount} Pistas</div>
                                    </div>
                                </button>
                            </div>
                        ))}
                        
                    </div>
                    <button
                    
                        type="button"
                        className="button-close-playlist-service btn btn-danger"
                        onClick={() => setCallGetPlaylist(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                   
                </div>

            )}
            <div className="playback-bar">
                {currentSong ? (
                    <div className="playback-song-info">
                        <img
                            src={currentSong.album.images[0].url}
                            alt={currentSong.name}
                        />
                        <div>
                            <div style={{ fontWeight: 'bolder' }}>{currentSong.name}</div>
                            {currentSong.artists.length > 0 && (
                                <div style={{ fontWeight: 'bolder' }}>{currentSong.artists[0].name}</div>
                            )}
                        </div>
                    </div>

                    
                ) : (
                    <div className="playback-font">No estás reproduciendo ninguna canción ahora mismo.</div>
                )}

                <div className="playback-buttons">
                    <button className="btn btn-dark" onClick={previousSong}><FontAwesomeIcon icon={faBackward} /></button>
                    <button className="btn btn-dark" onClick={handleResumeOrPauseSong}>
                        <FontAwesomeIcon icon={displayPauseIcon ? faPause : faPlay} />
                    </button>
                    <button className="btn btn-dark" onClick={nextSong}><FontAwesomeIcon icon={faForward} /></button>
                </div>
            </div>

        </div>
    );
};

export default SpotifySearchService;
