import React from "react";
import SearchTableRows from "./SearchTableRows";
import { useSearch } from "./SearchContext";

const SearchTable = ({ saveSong, addSongtoPlaylist, handleCallGetPlaylists,idPlaylistSelected, playSong, pauseSong,resumeSong, setUriSelected}) => {

    const {responseJson} = useSearch();

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
                                    uri={song.uri}
                                    saveSong={saveSong}
                                    addSongtoPlaylist={addSongtoPlaylist}
                                    handleCallGetPlaylists={handleCallGetPlaylists}
                                    idPlaylistSelected={idPlaylistSelected}
                                    playSong={playSong}
                                    pauseSong={pauseSong}
                                    setUriSelected={setUriSelected}
                                    resumeSong={resumeSong}
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