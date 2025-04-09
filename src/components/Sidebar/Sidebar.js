import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";

const sidebar = ({handleLogout}) =>{
    return(
        <div className="sidebar">

            <Link to="/">
                <img className="custom-log"
                    type="image/jpg" src="/LogoPlaylistCopy.jpg"
                    style={{ width: "40px", height: "40px" }}
                    onClick={handleLogout}
                ></img>
            </Link>

           
            <Link to="/playlist" style={{ height: "60px" }}>
                <button type="button" className="btn btn-dark"><FontAwesomeIcon icon={faBook} /></button>
            </Link>

            <Link to="/search"  style={{ height: "60px" }}>
                <button type="button" className="btn btn-dark"><FontAwesomeIcon icon={faSearch} /></button>
            </Link>
        </div>
    );

}

export default sidebar;