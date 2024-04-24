/* global Spotify */

import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"; 
import { useSearch } from "./SearchContext";

//``
const SpotifySearchService = () => {
    const { responseJson, setResponseJson } = useSearch();
    const [playlists, setPlaylists] = useState([]);
    const [callGetPlaylist, setCallGetPlaylist] = useState(false);
    const [idPlaylistSelected, setIdPlaylistSelected] = useState(null);
    const [idSongSelected, setIdSongSelected] = useState(null);
    const [uriSelected, setUriSelected] = useState(null);
    const [deviceId, setDeviceId] = useState(null);

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
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
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
                console.error("Error al reproducir la canción:", response.status);
                console.log(uriSelected);
            }
        } catch (error) {
            console.error("Error de red:", error);
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
                console.error("Error al pausar la canción:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
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
                console.error("Error al resumir la canción:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const searchSong = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:8080/search/${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                const uri = data[0].uri;
                setResponseJson(data);
                setUriSelected(uri); // Guardar la URI seleccionada
            } else {
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }     
    };

    const saveSong = async (idSong) => {
        try {
            const response = await fetch(`http://localhost:8080/songs/save/${idSong}`, {
                method: 'POST'
            });

            if (response.ok) {
                console.log("Endpoint builded", response);
                console.log(response.json());
            } else if (response.status === 409){
                console.error("La canción ya ha sido guardada!", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const addSongtoPlaylist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/playlist/addSong/${idSongSelected}/${idPlaylistSelected}`, {
                method: 'POST'
            });

            if (response.ok) {
                console.log("Endpoint builded", response);
            } else if (response.status === 409){
                console.error("La canción ya ha sido guardada!", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const getAllPlaylist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/playlist/getAllPlaylist`);
            if(response.ok){
                const data = await response.json();            
                setPlaylists(data);
            } else {
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
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

    useEffect(() => {
        if (idSongSelected !== null && idPlaylistSelected !== null) {
            addSongtoPlaylist(); 
            setCallGetPlaylist(false);
        }
    }, [idSongSelected, idPlaylistSelected]); // Observar cambios en idSongSelected e idPlaylistSelected


    return(
        <div className="child-container">
            <h2 className="h2">Buscar Canciones</h2>
    {/* <button id="togglePlay">Toggle Play</button> */}

            <SearchForm 
                onSearch={searchSong}
            />
            <SearchTable
                saveSong ={saveSong}
                addSongtoPlaylist= {addSongtoPlaylist}
                handleCallGetPlaylists={handleCallGetPlaylists}
                idPlaylistSelected={idPlaylistSelected}
                playSong={playSong}
                pauseSong={pauseSong}
                setUriSelected={setUriSelected}
                resumeSong={resumeSong}
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


        </div>
    );
};

export default SpotifySearchService;
