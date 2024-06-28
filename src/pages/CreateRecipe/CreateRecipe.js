import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preparation, setPreparation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let image_url = '';
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from('recipes')
        .upload(fileName, image);
      
      if (error) {
        console.error('Error al subir la imagen:', error);
        return;
      }
      image_url = `https://droigvzfsatgqnlyqouo.supabase.co/storage/v1/object/public/recipes/${data.path}`;
    }

    const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage
    if (!userId) {
      alert('No se ha encontrado el usuario.');
      return;
    }

    const { error: insertError } = await supabase
      .from('Recipes')
      .insert([{ 
        title, 
        content, 
        preparation, 
        image_url, 
        user_id: userId, // Asociar la receta con el usuario
      }]);

    if (insertError) {
      console.error('Error al crear la receta:', insertError);
    } else {
      alert('Receta creada exitosamente');
      navigate('/my-recipes');
    }
  };

  return (
    <div className="create-recipe-container">
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <h2>Crear Receta</h2>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preparation">Preparación:</label>
          <textarea
            id="preparation"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Previsualización" />
            </div>
          )}
        </div>
        <button type="submit" className="create-recipe-button">OK</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
