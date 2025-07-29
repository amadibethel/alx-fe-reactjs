import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Fetch detailed data for a single GitHub user.
 * @param {string} username - GitHub username.
 * @returns {Promise<Object>} - User data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("GitHub API fetchUserData error:", error);
    throw error;
  }
};

/**
 * Search GitHub users with optional filters such as username, location, and minimum repos.
 * @param {string} username - GitHub username or keyword to search.
 * @param {string} location - Location filter.
 * @param {string|number} minRepos - Minimum public repositories filter.
 * @returns {Promise<Array>} - Array of user summaries.
 */
export const searchUsers = async (username = "", location = "", minRepos = "") => {
  let query = "";

  if (username) {
    query += `${username} `;
  }

  if (location) {
    query += `location:${location} `;
  }

  if (minRepos) {
    query += `repos:>=${minRepos} `;
  }

  query = query.trim();

  if (!query) {
    // No search parameters provided; return empty list.
    return [];
  }

  try {
    // Construct the full API URL with encoded query and per_page limit.
    const response = await axios.get(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=30`
    );
    // Return the array of user items.
    return response.data.items || [];
  } catch (error) {
    console.error("GitHub API searchUsers error:", error);
    throw error;
  }
};
