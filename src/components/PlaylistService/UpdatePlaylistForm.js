import React, { useEffect, useState } from "react";


const UpdatePlaylistForm = ({updatePlaylist, formData, playlistSelected, handleInputChange, setIsEditing }) => {
    const { name } = formData; // Extrae 'name' del objeto 'playlistSelected'
    const { id } = playlistSelected; 

    return (
        <div className="center-table-form">
        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "25rem" }}>
          <div className="card-body">
            <h3 className="h2" style={{ fontWeight: 'bolder' }}>Editar {name}</h3>
            <br></br>
            <form onSubmit={() => updatePlaylist(id)}>
              <div className="mb-3">
                <label className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Descripcion
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Descripcion"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.description}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Imagen
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Imagen"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.image}
                />
              </div>

              <button className="btn btn-success" type="submit">Guardar</button>
              <button className="btn btn-danger" type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UpdatePlaylistForm;