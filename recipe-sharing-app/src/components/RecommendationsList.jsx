import { useRecipeStore } from '../store/recipeStore'
import { useEffect } from 'react'

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations)
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations)

  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        recommendations.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid green', padding: '10px', margin: '5px 0' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default RecommendationsList
