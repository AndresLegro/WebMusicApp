import React, {} from "react";

const CreatePlaylistForm = ({createPlaylist, formData, handleInputChange, setCallCreatePlaylist }) => {
    //const { name } = formData; 

    return (
        <div className="center-table-form">
        <div class="card text-white bg-dark mb-3" style={{ minWidth: "25rem" }}>
          <div className="card-body">
            <h3 className="h2" style={{ fontWeight: 'bolder' }}>Crear Playlist</h3>
            <br></br>
            <form onSubmit={() => createPlaylist()}>
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
                  Autor
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Autor de la playlist"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.author}
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
              <button className="btn btn-danger" type="button" onClick={() => setCallCreatePlaylist(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default CreatePlaylistForm;