import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

const SongSearchForm = ({onSearch , buttonText}) =>{

    const [searchTerm , setSearchTerm]= useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm); 
        } else {
            console.error("No hay nada que buscar!, por favor escribe algo");
        }
    };

    return(
        <div className='child-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Escribe lo que deseas buscar'
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type='submit' className="btn btn-success">{buttonText}</button>
            </form>

        </div>
       
    )
}

export default SongSearchForm;
