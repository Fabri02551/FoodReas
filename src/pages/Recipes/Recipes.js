import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .ilike('title', `%${searchTerm}%`);

      if (error) {
        console.error('Error al obtener las recetas:', error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="recipes-page-container">
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
            <h3 className="recipe-title">{recipe.title}</h3>
            <button onClick={() => navigate(`/viewRecipe/${recipe.id}`)}>Ver</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
