import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [responseJson, setResponseJson] = useState([]); 

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, responseJson, setResponseJson }}>
      {children}
    </SearchContext.Provider>
  );
};
