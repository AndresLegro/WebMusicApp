import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../SearchContext";
import { ResetPasswordForm } from "./ResetPasswordForm";
import {CreateAccountForm} from "./CreateAccountForm";

const SpotifyAuthService = ({ onLogin }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
    const {backEndUrl} = useSearch();
   
    function waiting(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const logIn = async () => {
        const url = `${backEndUrl}/login`;

        try {
            const response = await fetch(url,
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }
            );

            if (response.ok) {

                const spotifyLogin = `${backEndUrl}/spotify/login`;
                const newPopup = window.open(spotifyLogin, "_blank");

                const getToken = await fetch(`${backEndUrl}/spotify/getToken`,
                     {method: "GET", headers: {"Content-Type": "application/json" }});

                let tries = 8;
                let time = 4000;
                let tokenObtained = false;

                while (tries > 0){

                    const getToken = await fetch(`${backEndUrl}/spotify/getToken`,
                        {method: "GET", headers: {"Content-Type": "application/json" }});

                    if (getToken.ok){
                        tokenObtained= true;
                        break;
                    }else{
                        await waiting(time);
                        tries--;
                    }
                }

                if(tokenObtained){

                    localStorage.setItem("spotifyToken", "true");
                    setLoggedIn(true);
                    onLogin();
                    newPopup.close();
                    Swal.fire("Exito", "Bienvenido!", <FontAwesomeIcon icon={faSpotify}/>);
                }else{
                    Swal.fire("Error", "Operacion no autorizada por Spotify!", <FontAwesomeIcon icon={faSpotify}/>);
                }
      
            } else {
                Swal.fire("Error", "Usuario o contraseña incorrectos");
            }
        } catch (error) {
            Swal.fire("Error", "Error del servidor", error);
        }

        
    }
    
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

    const resetPassword = async ( password) => {
        const url = `${backEndUrl}/resetPassword`;

        try {
            const response = await fetch(url,
                { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }
            );

            if (response.ok) {
                Swal.fire("Exito", "Contraseña cambiada exitosamente!");
            }else if(response.status === 404)
            {
                Swal.fire("Error", "Usuario no existe!");
            }else{
                Swal.fire("Error", "No se pudo cambiar la contraseña!");
            }
        }catch(error){
            Swal.fire("Error", "Error del servidor", error);
        }
    }

    const handleResetPassword = ( password) => {
        setShowResetPasswordForm(false);
        resetPassword( password);
    };

    const createAccount = async (username, password) => {
        const url = `${backEndUrl}/createUser`;

        try {
            const response = await fetch(url,
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }
            );

            if (response.ok) {
                Swal.fire("Exito", "Has creado tu cuenta exitosamente!");
            }else if(response.status === 409)
            {
                Swal.fire("Error", "Usuario ya existe!");
            }else{
                Swal.fire("Error", "No se pudo crear la cuenta!");
            }
        }catch(error){
            Swal.fire("Error", "Error del servidor", error);
        }
    }

    const handleCreateAccount  = ( username, password) => {
        setShowCreateAccountForm(false);
        createAccount( username, password);
    };
    

    return (
        <div className="login">

            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div class="card p-4 shadow-lg bg-dark text-white">
                    <h2 class="text-center mb-3">Iniciar Sesión</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Usuario</label>
                            <input type="text" class="form-control"
                                id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingresa tu usuario" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <div className="input-group">

                                <input
                                    type={!showPassword ? "password" : "text"}
                                    class="form-control"
                                    id="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña" />
                                {!showResetPasswordForm && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ borderLeft: "none" }}
                                    >
                                        {!showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                                    </button>
                                )}
                                
                            </div>

                        </div>

                        <div class="mb-3">
                        <button type="button" className="btn btn-dark" onClick={() => setShowResetPasswordForm(true)} style={{marginLeft:'7%'}} >
                            Cambiar Contraseña
                        </button>                      
                        </div>
                        <button type="button" className="btn btn-outline-success" onClick={handleLogin} style={{marginLeft:'25%'}}>
                            Log In  <FontAwesomeIcon icon={faSpotify} />
                        </button>

                    </form>

                    <button type="button" className="btn btn-outline-secondary" style={{marginTop:"10%"}} onClick={() => setShowCreateAccountForm(true)} >
                        No tienes cuenta? Creala!
                    </button>
                </div>
            </div>

            {showResetPasswordForm && (
                <ResetPasswordForm
                handleResetPassword= {handleResetPassword}
                setShowResetPasswordForm={setShowResetPasswordForm}
            />
            )}

            {showCreateAccountForm && (
                <CreateAccountForm
                    handleCreateAccount={handleCreateAccount}
                    setShowCreateAccountForm={setShowCreateAccountForm}
                />
            )}
      
        </div>
    );
};

export default SpotifyAuthService;
