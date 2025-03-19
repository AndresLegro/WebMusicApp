import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [responseJson, setResponseJson] = useState([]); 
  // "http://localhost:8080" // "https://spotifylegroapp.azurewebsites.net"
  const [backEndUrl, setBackEndUrl] = useState("https://spotifylegroapp.azurewebsites.net"); 

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, responseJson, setResponseJson, backEndUrl }}>
      {children}
    </SearchContext.Provider>
  );
};
