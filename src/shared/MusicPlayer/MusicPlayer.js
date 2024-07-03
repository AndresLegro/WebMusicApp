import React, { useEffect, useState } from "react";
import PlaylistService from "../../components/PlaylistService/PlaylistService";

/* global Spotify */

const MusicPlayer = () => {

    const { responseJson, setResponseJson } = useState([]);
    const [uriSelected, setUriSelected] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [displayResumeIcon, setDisplayResumeIcon] = useState(false);
    const [displayPauseIcon, setDisplayPauseIcon] = useState(true);

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
                console.log(currentSong);
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
                    console.log("Siguiente canción");
                    console.log("currentSongIndex = " + currentSongIndex);
                } else {
                    console.log("No hay más canciones disponibles");
                    playSong(responseJson[9].uri);
                }
            } else {
                console.error("Error al pasar de canción:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
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
                    console.log("Anterior canción");
                    console.log("currentSongIndex = " + currentSongIndex);
                } else {
                    console.log("No hay más canciones disponibles");
                    console.log("currentSongIndex = " + currentSongIndex);
                }
            } else {
                console.error("Error al pasar de canción:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <div>
            <PlaylistService
                playSong={playSong}
                pauseSong={pauseSong}
                resumeSong={resumeSong}
            />
        </div>
    );
}

export default MusicPlayer;

