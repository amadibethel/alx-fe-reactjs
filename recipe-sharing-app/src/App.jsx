// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import RecipeList from './components/RecipeList';
// Import other pages like AddRecipeForm, EditRecipeForm, etc.

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 mb-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/favorites" className="mr-4">Favorites</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/recommendations" element={<RecommendationsList />} />
        {/* Include other routes like AddRecipeForm, EditRecipeForm */}
      </Routes>
    </Router>
  );
}

export default App;
