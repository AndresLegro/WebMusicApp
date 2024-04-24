import React, { useState, useRef } from "react";
import Swal from 'sweetalert2';

const SpotifyAuthService = ({ onLogin }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [popup, setPopup] = useState(null);
    const [timeExpired, setTimeExpired] = useState(false);
    const timeExpiredRef = useRef(timeExpired);

    const logIn = async () => {
        try {
            const url = "http://localhost:8080/spotify/login";
            const newPopup = window.open(url, "_blank");
            setPopup(newPopup);

            const timeout = setTimeout(() => {
                if (!loggedIn) {
                    newPopup.close();
                    console.log("Tiempo de inicio de sesión agotado");
                    timeExpiredRef.current = true; 
                    setTimeExpired(true); 
                }
            }, 80000);

            let retryInterval = 5000;

            while (!loggedIn && !timeExpiredRef.current) {
                await new Promise(resolve => setTimeout(resolve, retryInterval));

                if (timeExpiredRef.current) {
                    break;
                } else {
                    const response = await fetch("http://localhost:8080/spotify/getToken");
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
            didOpen: () => {
                Swal.showLoading();
                logIn();
            }
        });
    };

    return (
        <div className="child-container">
            <button type="button" className="btn btn-info" onClick={handleLogin}>
                Log In to Spotify
            </button>
        </div>
    );
};

export default SpotifyAuthService;
