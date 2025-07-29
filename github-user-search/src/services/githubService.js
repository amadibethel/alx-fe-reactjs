import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
    },
  });
  return response.data;
};

export const searchUsers = async (username, location, minRepos) => {
  let query = "";
  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users?q=${query}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
    },
  });

  return response.data.items;
};
