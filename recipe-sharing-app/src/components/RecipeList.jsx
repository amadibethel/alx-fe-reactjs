// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Required import
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3>
              <Link to={`/recipe/${index}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No matching recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
