import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";

const sidebar = () =>{
    return(
        <div className="sidebar">
            <img className="custom-log"
                type="image/jpg" src="/LogoPlaylistCopy.jpg"
                style={{ width: "50px", height: "50px" }}
                ></img>

            <Link to="/playlist">
                <button type="button" className="btn btn-dark"><FontAwesomeIcon icon={faBook} /></button>
            </Link>

            <Link to="/search">
                <button type="button" className="btn btn-dark"><FontAwesomeIcon icon={faSearch} /></button>
            </Link>
        </div>
    );

}

export default sidebar;