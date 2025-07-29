import axios from "axios";

/**
 * Search GitHub users with optional filters.
 * 
 * @param {string} username - GitHub username or keyword to search.
 * @param {string} location - Location filter.
 * @param {string|number} minRepos - Minimum public repositories filter.
 * @returns {Promise<Array>} - Returns an array of user objects.
 */
export const searchUsers = async (username = "", location = "", minRepos = "") => {
  // Construct the query parameter based on inputs
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
    // If no query params, return empty array immediately
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=30`
    );

    // GitHub returns items array inside response.data
    return response.data.items || [];
  } catch (error) {
    console.error("GitHub API searchUsers error:", error);
    throw error;
  }
};
