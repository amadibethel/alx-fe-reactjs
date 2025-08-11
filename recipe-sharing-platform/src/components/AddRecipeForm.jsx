import React, { useState } from 'react';

function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!ingredients.trim()) errs.ingredients = 'Ingredients are required';
    else if (ingredients.split(',').filter(i => i.trim() !== '').length < 2)
      errs.ingredients = 'Please list at least two ingredients separated by commas';
    if (!steps.trim()) errs.steps = 'Preparation steps are required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions: steps.split('.').map(s => s.trim()).filter(s => s),
      image: '/images/default.jpg', // Placeholder, replace as needed
      summary: '',
    };

    if (onAddRecipe) {
      onAddRecipe(newRecipe);
    }

    // Clear form
    setTitle('');
    setIngredients('');
    setSteps('');
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-semibold">
          Recipe Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter recipe title"
        />
        {errors.title && (
          <p className="text-red-600 mt-1 text-sm">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="ingredients" className="block mb-1 font-semibold">
          Ingredients (comma separated)
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 ${
            errors.ingredients ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          rows={4}
          placeholder="e.g., 200g spaghetti, 100g minced beef, 1 onion"
        />
        {errors.ingredients && (
          <p className="text-red-600 mt-1 text-sm">{errors.ingredients}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="steps" className="block mb-1 font-semibold">
          Preparation Steps (separate sentences with periods)
        </label>
        <textarea
          id="steps"
          value={steps}
          onChange={e => setSteps(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 ${
            errors.steps ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          rows={5}
          placeholder="Describe the preparation steps. E.g., Boil water. Cook pasta. Drain."
        />
        {errors.steps && (
          <p className="text-red-600 mt-1 text-sm">{errors.steps}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold"
      >
        Submit Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
