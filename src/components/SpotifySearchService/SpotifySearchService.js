import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";


// ``
const SpotifySearchService = () =>{

    const [responseJson, setResponseJson] = useState([]);
    const [searchAction, setSearchAction] = useState("");

    const searchSong = async (searchTerm) => {

        try {
            const response = await fetch(`http://localhost:8080/search/${searchTerm}`);
            if(response.ok){
                const data = await response.json();
                console.log("Endpoint builded", response)
                console.log(data);
                setResponseJson(data);
            }else{
                console.error("Error al iniciar sesión en Spotify:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }     
     
    }

    const saveSong = async (idSong) => {
        try {
            const response = await fetch(`http://localhost:8080/songs/save/${idSong}`, {
                method: 'POST'
            });
            setSearchAction("Guardar");

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

    const addSongtoPlaylist = async (idSong) => {
        try {
            const response = await fetch(`http://localhost:8080/playlist/addSong/${idSong}/4`, {
                method: 'POST'
            });
            setSearchAction("Guardar");
            console.log("Endpoint builded", response);

            if (response.ok) {
                console.log("Endpoint builded", response);
            } else if (response.status === 409){
                console.error("La canción ya ha sido guardada!", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };


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
            />

            <div>

            </div>
        
        </div>

       
    );

}

export default SpotifySearchService;