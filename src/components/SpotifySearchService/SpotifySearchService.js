import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";

//``
const SpotifySearchService = () => {
    const [responseJson, setResponseJson] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [callGetPlaylist, setCallGetPlaylist] = useState(false);
    const [idPlaylistSelected, setIdPlaylistSelected] = useState(null);
    const [idSongSelected, setIdSongSelected] = useState(null);

    const searchSong = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:8080/search/${searchTerm}`);
            if(response.ok){
                const data = await response.json();
                console.log("Endpoint builded", response);
                setResponseJson(data);
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
        console.log(`Id de la cancion : ${idSong}`)
    };

    const openModalAndSetPlaylist  = (playlistId) => {
        setIdPlaylistSelected(playlistId);
        console.log(`Id de la playlist : ${playlistId}`);
    };

    useEffect(() => {
        // Este efecto se activará cuando tanto idSongSelected como idPlaylistSelected estén disponibles
        if (idSongSelected !== null && idPlaylistSelected !== null) {
            addSongtoPlaylist(); 
            setCallGetPlaylist(false);
        }
    }, [idSongSelected, idPlaylistSelected]); // Observar cambios en idSongSelected e idPlaylistSelected


    return(
        <div className="child-container">
            <h2 className="h2">Buscar Canciones</h2>
            <SearchForm 
                onSearch={searchSong}
            />
            <SearchTable
                responseJson={responseJson}
                saveSong ={saveSong}
                addSongtoPlaylist= {addSongtoPlaylist}
                handleCallGetPlaylists={handleCallGetPlaylists}
                idPlaylistSelected={idPlaylistSelected}
            />

            {callGetPlaylist && (
                <div>
                    <div className={`${callGetPlaylist ? 'blur-background' : ''}`}>
                        {playlists.map((playlist) => (
                            <div key={playlist.id}>
                                <button
                                    type="button"
                                    className="buttons-playlist-service"
                                    onClick={() => openModalAndSetPlaylist(playlist.id)}
                                >
                                    <div className="conten-playlist-view">
                                        <img
                                            src={playlist.image}
                                            alt={playlist.name}
                                            style={{ width: "15px", height: "15px", marginBlockEnd: "1rem" }}
                                        />
                                        <div style={{ fontWeight: 'bolder' }}>{playlist.name}</div>
                                        <div>{playlist.author}</div>
                                        <div>{playlist.songsAmount} Pistas</div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            )}
        </div>
    );
};

export default SpotifySearchService;
