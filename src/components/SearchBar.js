import React from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar receta por título..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
