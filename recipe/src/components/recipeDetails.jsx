import React from 'react';
import { motion } from 'framer-motion';
import { MdClose, MdFavorite } from 'react-icons/md';
import './recipeDetails.css';

const RecipeDetails = ({ recipe, onClose, currentUser, onLike }) => {
  return (
    <motion.div
      className="recipe-details-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="recipe-details"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button className="close-button" onClick={onClose}>
          <MdClose />
        </button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Area:</strong> {recipe.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            return ingredient && (
              <li key={i}>{`${ingredient} - ${measure}`}</li>
            );
          })}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.strInstructions}</p>
        <button 
          className="like-button" 
          onClick={() => onLike(recipe.idMeal)}
        >
          <MdFavorite color={recipe.likes && recipe.likes.includes(currentUser?.id) ? 'red' : 'gray'} />
          {recipe.likes ? recipe.likes.length : 0} Likes
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetails;