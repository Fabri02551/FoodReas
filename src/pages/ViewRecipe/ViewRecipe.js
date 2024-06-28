import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './ViewRecipe.css';

const ViewRecipe = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [recipe, setRecipe] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const userId = localStorage.getItem('userId'); // Obtener userId de localStorage

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .eq('id', id)
        .single(); // Obtener solo un registro

      if (error) {
        console.error('Error al obtener la receta:', error);
      } else {
        setRecipe(data);
        if (data?.id) {
          fetchAverageRating(data.id);
        }
        if (userId) {
          fetchUserRating(data.id, userId);
        }
      }
    };

    fetchRecipe();
  }, [id, userId]);

  const fetchAverageRating = async (recipeId) => {
    const { data, error } = await supabase
      .from('Ratings')
      .select('score')
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error al obtener las calificaciones:', error);
    } else {
      const totalRating = data.reduce((acc, rating) => acc + rating.score, 0);
      const average = data.length > 0 ? totalRating / data.length : 0;
      setAverageRating(average);
    }
  };

  const fetchUserRating = async (recipeId, userId) => {
    const { data, error } = await supabase
      .from('Ratings')
      .select('score')
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error al obtener la calificación del usuario:', error);
    } else {
      setUserRating(data?.score || 0);
    }
  };

  const handleRating = async (rating) => {
    if (!userId) {
      alert('Debes estar logueado para calificar.');
      return;
    }

    try {
      console.log('Intentando enviar calificación:', { recipe_id: id, user_id: userId, score: rating });

      const { error } = await supabase
        .from('Ratings')
        .upsert({
          recipe_id: id,
          user_id: userId,
          score: rating
        }, {
          onConflict: ['recipe_id', 'user_id'] // Evita duplicados
        });

      if (error) {
        console.error('Error al enviar la calificación:', error);
      } else {
        console.log('Calificación enviada correctamente');
        setUserRating(rating);
        fetchAverageRating(id); // Refrescar la calificación media después de la actualización
      }
    } catch (error) {
      console.error('Error al enviar la calificación (catch):', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => handleRating(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  if (!recipe) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="view-recipe-container">
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} className="view-recipe-image" />
      <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
      <p><strong>Contenido:</strong> {recipe.content}</p>
      <p><strong>Preparación:</strong> {recipe.preparation}</p>
      <div className="rating">
        <h3>Calificación: {averageRating.toFixed(1)}</h3>
        <div className="stars">
          {renderStars(userRating || averageRating)}
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
