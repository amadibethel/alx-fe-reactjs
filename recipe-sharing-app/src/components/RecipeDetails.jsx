// src/components/RecipeDetails.jsx
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === id)
  );

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipeId={id} />
      <DeleteRecipeButton recipeId={id} />
    </div>
  );
};

export default RecipeDetails;
