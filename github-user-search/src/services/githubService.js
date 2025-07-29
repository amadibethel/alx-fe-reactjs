import axios from "axios";

// Base URL for GitHub API
const BASE_URL = "https://api.github.com/search/users";

/**
 * Search users with advanced criteria: username, location, minimum repos
 * @param {string} username - GitHub username (optional)
 * @param {string} location - User location (optional)
 * @param {string|number} minRepos - Minimum number of public repos (optional)
 * @returns {Promise<Array>} - Array of users matching the criteria
 */
export const searchUsers = async (username = "", location = "", minRepos = "") => {
  try {
    // Build the query string for the search API
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

    // Make GET request to GitHub Search API
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        per_page: 30, // adjust as needed, max is 100
      },
      headers: {
        // Include auth if you have a token, otherwise omit this
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
      },
    });

    // The API returns items array with users
    return response.data.items;
  } catch (error) {
    console.error("GitHub search API error:", error);
    throw error;
  }
};
