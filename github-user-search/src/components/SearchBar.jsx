// components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = () => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${username}`);
    // To be replaced with GitHub API call
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
