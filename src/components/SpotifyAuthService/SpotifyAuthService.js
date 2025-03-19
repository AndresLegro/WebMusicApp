import React, { useState, useRef } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useSearch } from "../SearchContext";

const SpotifyAuthService = ({ onLogin }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [popup, setPopup] = useState(null);
    const [timeExpired, setTimeExpired] = useState(false);
    const timeExpiredRef = useRef(timeExpired);
    const {backEndUrl} = useSearch();

    const logIn = async () => {
        try {
            const url = `${backEndUrl}/spotify/login`;
            const newPopup = window.open(url, "_blank");
            setPopup(newPopup);

            const timeout = setTimeout(() => {
                if (!loggedIn) {
                    newPopup.close();
                    console.log("Tiempo de inicio de sesión agotado");
                    timeExpiredRef.current = true; 
                    setTimeExpired(true); 
                }
            }, 50000);

            let retryInterval = 5000;

            while (!loggedIn && !timeExpiredRef.current) {
                await new Promise(resolve => setTimeout(resolve, retryInterval));

                if (timeExpiredRef.current) {
                    break;
                } else {
                    const response = await fetch(`${backEndUrl}/spotify/getToken`);
                    if (response.ok) {
                        const token = await response.json();
                        localStorage.setItem("spotifyToken", token);
                        timeExpiredRef.current = true; 
                        setLoggedIn(true);
                        onLogin();
                        Swal.close();
                        newPopup.close();
                    } else {
                        console.error("Aun no has iniciado sesion en Spotify!");
                    }

                    retryInterval *= 1.4;
                }
            }

            clearTimeout(timeout);

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    
    const handleLogin = () => {
        Swal.fire({
            title: 'Esperando a que inicies sesión en Spotify',
            html: `<span style="display: flex; align-items: center;"></span> Iniciando sesión...`,
            didOpen: () => {
                Swal.showLoading();
                logIn();
            }
        });
    };
    

    return (
        <div className="login">
            <button type="button" className="btn btn-success" onClick={handleLogin}>
                Log In to Spotify <FontAwesomeIcon icon={faSpotify} />
            </button>
        </div>
    );
};

export default SpotifyAuthService;
