import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SpotifyAuthService from "./components/SpotifyAuthService/SpotifyAuthService";
import SpotifySearchService from "./components/SpotifySearchService/SpotifySearchService";
import PlaylistService from "./components/PlaylistService/PlaylistService";
import Sidebar from "./components/Sidebar/Sidebar";
import PlaylistSingleView from "./components/PlaylistService/PlaylistSingleView";
import { SearchProvider } from ".//components/SearchContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
   const handleLogin = async () => {  
      const now = new Date().getTime();
      localStorage.setItem("spotifyToken", "true");     
      localStorage.setItem("loginTime", now);

      setLoggedIn(true);
   };

   const handleLogout = async () => {  
    localStorage.setItem("spotifyToken", "false");   
    localStorage.removeItem("loginTime");      
    setLoggedIn(false);
 };

   useEffect(() => {

    const token = localStorage.getItem("spotifyToken");
    const isLoggedInFlag = localStorage.getItem("loginTime");

    if(!token || token === false || !isLoggedInFlag){
      localStorage.clear();
    }

    const isLoggedIn = JSON.parse(localStorage.getItem("spotifyToken") || "false"); 
    const loginTime = localStorage.getItem("loginTime");
    const expirationTime = 12 * 60 * 60 * 1000;

    if(isLoggedIn && loginTime){
      const elapsedTime = new Date().getTime() - parseInt(loginTime, 10);
        
        if (elapsedTime > expirationTime) {
            // Si han pasado más de 12 horas, desloguear
            handleLogout();
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }else{
      setLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // Evita redirecciones hasta que termine la verificación
  }

  return (
    <SearchProvider>
      <Router>
        <div className="main-container">
          <div className="child-container">
            {loggedIn && <div className="sidebar"><Sidebar handleLogout={handleLogout} /></div>}

            <Routes>

              <Route path="/" element={!loggedIn ? <SpotifyAuthService onLogin={handleLogin} /> : <Navigate to="search"/>}/>
              <Route path="/search" element={loggedIn ? <SpotifySearchService /> : <Navigate to="/"/>} />
              <Route path="/playlist" element={loggedIn ? <PlaylistService /> : <Navigate to="/"/>} />
              <Route path="/getPlaylist" element={loggedIn ? <PlaylistSingleView /> : <Navigate to="/"/>} />

            </Routes>
          </div>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
