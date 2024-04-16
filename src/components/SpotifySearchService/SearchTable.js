import React, { useState } from "react";
import SearchTableRows from "./SearchTableRows";

const SearchTable = ({responseJson , saveSong, addSongtoPlaylist}) => {
    console.log(responseJson);

    return (
        <div className="">
            <div className="card-body background-gradient">
                <div className="">
                    <table className="table align-middle table-borderless">
                    <thead className="text-center">
                            <tr>
                                <th className="thTable">Canciones Encontradas</th>
                               
                            </tr>
                        </thead>

                        <tbody>
                            {responseJson.map((song, index) => (
                                <SearchTableRows
                                    key={index}
                                    id={song.id}
                                    name={song.name}
                                    artist={song.artists[0].name}
                                    album={song.album.name}
                                    duration={song.duration_ms}
                                    image={song.album.images[0].url}
                                    saveSong={saveSong}
                                    addSongtoPlaylist={addSongtoPlaylist}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SearchTable;