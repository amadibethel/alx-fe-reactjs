import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm'; // ✅ Import added
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
    setSearchTerm('');
  }, [setRecipes, setSearchTerm]);

  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <Link to="/add">Add Recipe</Link> {/* Optional navigation */}
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm /> {/* Rendered here */}
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
