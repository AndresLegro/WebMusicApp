import React, { useEffect, useState } from "react";

const SpotifyAuthService = ({onLogin}) =>{

    const logIn = async () => {

        try {
            const url = "http://localhost:8080/spotify/login";
            window.open(url, "_blank")
            onLogin(); 
            console.log("Log in spotify succesfully")

        } catch (error) {
            console.error("Error de red:", error);
        }     
     
    }

   
    const handleLogin = () => {
        logIn();   // Ejecutar la función local
    };

    return(
        <div className="child-container">
            <button type="button" className="btn btn-info" onClick={handleLogin}>Log In on Spotify</button>
        </div>
    );

}

export default SpotifyAuthService;