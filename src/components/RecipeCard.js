import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/viewRecipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image_url} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <button onClick={handleView}>Ver</button>
    </div>
  );
};

export default RecipeCard;
