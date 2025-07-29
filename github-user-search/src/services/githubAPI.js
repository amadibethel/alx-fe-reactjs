// services/githubAPI.js

import axios from "axios";

const BASE_URL = "https://api.github.com/users/";
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export const fetchUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};
