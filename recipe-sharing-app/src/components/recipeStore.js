import { create } from 'zustand'

export interface Recipe {
  id: number
  title: string
  description: string
  tags?: string[]
}

interface RecipeStore {
  recipes: Recipe[]
  filteredRecipes: Recipe[]
  favorites: number[]
  recommendations: Recipe[]
  searchTerm: string

  // Recipe management
  setRecipes: (recipes: Recipe[]) => void
  addRecipe: (recipe: Recipe) => void
  updateRecipe: (recipe: Recipe) => void
  deleteRecipe: (id: number) => void

  // Search and filter
  setSearchTerm: (term: string) => void

  // Favorites
  addFavorite: (recipeId: number) => void
  removeFavorite: (recipeId: number) => void

  // Personalized recommendations
  generateRecommendations: () => void
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',

  // Set full list of recipes and update filteredRecipes
  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // Add a recipe
  addRecipe: (newRecipe) =>
    set((state) => {
      const updated = [...state.recipes, newRecipe]
      return {
        recipes: updated,
        filteredRecipes: updated.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      }
    }),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
      return {
        recipes: updated,
        filteredRecipes: updated.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      }
    }),

  // Delete a recipe
  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((recipe) => recipe.id !== id)
      return {
        recipes: updated,
        filteredRecipes: updated.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
        favorites: state.favorites.filter((favId) => favId !== id), // Remove from favorites if exists
      }
    }),

  // Search term updates filteredRecipes
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      ),
    })),

  // Add to favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  // Remove from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Generate mock personalized recommendations
  generateRecommendations: () => {
    const { recipes, favorites } = get()
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) ||
        (recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().includes('easy')))
    )
    set({ recommendations: recommended })
  },
}))
