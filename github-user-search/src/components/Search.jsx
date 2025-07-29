import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [singleUser, setSingleUser] = useState(null);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSingleUser(null);
    setResults([]);

    try {
      // If only username is provided, do single user fetch
      if (username && !location && !minRepos) {
        const data = await fetchUserData(username);
        setSingleUser(data);
      } else {
        const users = await searchUsers(username, location, minRepos);
        setResults(users);
        if (users.length === 0) {
          setError("Looks like we cant find the user");
        }
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">GitHub User Search</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Minimum public repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {/* Render single user result */}
      {singleUser && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow text-center">
          <img
            src={singleUser.avatar_url}
            alt={singleUser.login}
            className="w-24 h-24 rounded-full mx-auto mb-2"
          />
          <h2 className="text-lg font-semibold">{singleUser.name || singleUser.login}</h2>
          <a
            href={singleUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Profile
          </a>
        </div>
      )}

      {/* Render multiple search results */}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center bg-gray-100 p-4 rounded shadow"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
