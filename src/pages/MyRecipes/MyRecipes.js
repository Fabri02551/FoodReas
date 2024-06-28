import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './MyRecipes.css';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      // Obtén el userId desde localStorage
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('Usuario no logueado');
        return;
      }

      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .eq('user_id', userId); // Filtrar recetas por user_id

      if (error) {
        console.error('Error al obtener las recetas:', error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editRecipe/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Recipes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar la receta:', error);
    } else {
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  return (
    <div className="my-recipes-container">
      <div className="my-recipes-header">
        <h2>Mis Recetas</h2>
        <button className="insert-recipe-button" onClick={() => navigate('/create-recipe')}>Insertar</button>
      </div>
      <div className="recipes-list">
        {recipes.length === 0 ? (
          <p className="no-recipes-message">No tienes recetas aún. ¡Sube tu primera receta!</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              {recipe.image_url && (
                <img src={recipe.image_url} alt={recipe.title} />
              )}
              <div className="button-group">
                <button onClick={() => navigate(`/viewRecipe/${recipe.id}`)}>Ver</button>
                <button onClick={() => handleEdit(recipe.id)}>Editar</button>
                <button onClick={() => handleDelete(recipe.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
