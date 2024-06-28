import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel'; // Asegúrate de instalar react-bootstrap y bootstrap

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9);

      if (error) {
        console.error('Error al obtener las recetas:', error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="home-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Explora Nuevas Recetas</h3>
            <p>Descubre una amplia variedad de recetas deliciosas, desde platos tradicionales hasta creaciones innovadoras.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://hips.hearstapps.com/hmg-prod/images/home-1589276065.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Comparte Tus Creaciones</h3>
            <p>Sube tus recetas favoritas y compártelas con la comunidad para que todos puedan disfrutar de tus habilidades culinarias.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://desafio22.com/wp-content/uploads/Hummus-sandwich-with-fresh-veggies-1000x1000.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Califica y Guarda Recetas</h3>
            <p>Califica las recetas que pruebas y guarda tus favoritas para tenerlas siempre a mano.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="recipes-list1">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card1">
            <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
            <h3 className="recipe-title">{recipe.title}</h3>
            <Link to={`/viewRecipe/${recipe.id}`} className="recipe-link">Ver</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
