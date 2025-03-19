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
  const {backEndUrl} = SearchProvider;

  useEffect(() => {

    const checkSession = async () => {
      console.log(loggedIn);

      const storedLogin = localStorage.getItem("loggedIn") === "true";

      if (storedLogin) {
        try {
          const response = await fetch(`${backEndUrl}/spotify/getToken`)

          if (response.status === 200) {
            handleLogin();
          } else {
            handleLogout();
            console.log("La sesion expiro");
          }

        } catch (error) {
          console.error("Error verificando sesión:", error);
          handleLogout();
        }
      }

    };

    checkSession();
  }, []);

  const handleLogin = async () => {     
      setLoggedIn(true);
      localStorage.setItem("loggedIn" , "true");
      console.log("User logged in!");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  useEffect(() => {
   //localStorage.getItem(loggedIn);
   console.log(loggedIn);
  }, []);

  return (
    <SearchProvider>
      <Router>
        <div className="main-container">
          {loggedIn && <div className=""><Sidebar /></div>}
          <div className="child-container">
            <Routes>
              <Route
                exact
                path="/"
                element={!loggedIn ? <SpotifyAuthService onLogin={handleLogin} /> : <Navigate to="/search" />}
              />
              <Route path="/search" element={<SpotifySearchService />} />
              <Route path="/playlist" element={<PlaylistService />} />
              <Route path="/getPlaylist" element={<PlaylistSingleView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
