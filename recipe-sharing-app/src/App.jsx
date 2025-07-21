// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import RecipeDetails from './components/RecipeDetails'; // You can stub this for now
import { useRecipeStore } from './components/recipeStore';

const App = () => {
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  useEffect(() => {
    const sampleRecipes = [
      { title: 'Jollof Rice', description: 'West African spicy rice dish' },
      { title: 'Egusi Soup', description: 'Melon seed soup with spinach' },
    ];
    setRecipes(sampleRecipes);
    setSearchTerm(''); // to initialize filtered list
  }, [setRecipes, setSearchTerm]);

  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
