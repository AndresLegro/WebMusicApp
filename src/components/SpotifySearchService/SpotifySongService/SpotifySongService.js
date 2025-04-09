import React, { useEffect, useState } from "react";
import SearchForm from "./SpotifySearchService/SearchForm";
import { useSearch } from "../SearchContext";

const SpotifySongService = () => {
    const [searchAction, setSearchAction] = useState("");
    const [showForm, setShowForm] = useState(false);
    const {backEndUrl} = useSearch();

    const getSong = async (searchTerm) => {
        try {
            const response = await fetch(`${backEndUrl}/songs/get/${searchTerm}`);
            setSearchAction("Buscar");
            
            if (response.status === 404){
                Swal.fire("Error", "La canción no existe!");
            }
            else if(!response.status === 404){
                Swal.fire("Error", "Aun no has iniciado sesion en Spotify o tu sesion ya expiró!");
            }
        } catch (error) {
            Swal.fire("Error", "Error de red!");
        }
    };

    const handleGetSongClick = () => {
        setSearchAction("Buscar");
        setShowForm(true);
    };

    const handleSaveSongClick = () => {
        setSearchAction("Guardar");
        setShowForm(true);
    };

    return (
        <div className="child-container">

             <h2>{searchAction} Canciones</h2> 

             <SearchForm 
                onSearch={getSong}
            
            />

            <div className="buttons-song-service">
                <button type='button' className="btn btn-primary" onClick={handleGetSongClick}>Buscar Canciones</button>
                <button type='button' className="btn btn-warning" onClick={handleSaveSongClick}>Guardar Canciones</button>
            </div>
            
        </div>
    );
};

export default SpotifySongService;
