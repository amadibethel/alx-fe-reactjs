import { useRecipeStore } from './recipeStore';

const RecipeItem = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite } = useRecipeStore();
  const isFavorite = favorites.includes(recipe.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id);
  };

  return (
    <div>
      <h3>{recipe.title}</h3>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};
