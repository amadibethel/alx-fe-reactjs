import React, { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import { useRecipeStore } from './store/recipeStore';

const App = () => {
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  useEffect(() => {
    // You can fetch your recipe data here
    const data = [
      { id: 1, title: 'Spaghetti Bolognese', description: 'With tomato sauce' },
      { id: 2, title: 'Chicken Curry', description: 'Spicy and creamy' },
      { id: 3, title: 'Salad', description: 'Fresh vegetables' },
    ];

    setRecipes(data);
  }, [setRecipes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
};

export default App;
