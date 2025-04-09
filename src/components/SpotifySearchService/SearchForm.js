import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 
import React, { useState } from "react";
import { useSearch } from '../SearchContext';
import Swal from 'sweetalert2';


const SearchForm = ({onSearch}) =>{

    const {searchTerm , setSearchTerm}= useSearch();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);
        } else {
            Swal.fire("Error", "No hay nada que buscar!, por favor escribe algo!");
        }
    };

    return(
        <div className='search-container'>
            <form className='searching-bar' onSubmit={handleSubmit}>
                <input className='searching-bar'
                    style={{ backgroundColor: "#363636", marginTop: "1rem"}}
                    type="text"
                    placeholder='Escribe lo que deseas buscar'
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type='submit' className="btn btn-success"><FontAwesomeIcon icon={faSearch}/></button>
            </form>

        </div>
       
    )
}

export default SearchForm;
