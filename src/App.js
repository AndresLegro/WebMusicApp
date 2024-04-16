import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SpotifyAuthService from "./components/SpotifyAuthService/SpotifyAuthService";
import SpotifySearchService from "./components/SpotifySearchService/SpotifySearchService";
import PlaylistService from "./components/PlaylistService/PlaylistService";
import Sidebar from "./components/Sidebar/Sidebar";
import PlaylistSingleView from "./components/PlaylistService/PlaylistSingleView";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("User logged in!");
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>

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
  );
}

export default App;
