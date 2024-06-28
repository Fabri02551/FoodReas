// src/pages/EditRecipe/EditRecipe.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [content, setContent] = useState('');
  const [preparation, setPreparation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error al obtener la receta:', error);
      } else {
        setTitle(data.title);
        setContent(data.content);
        setPreparation(data.preparation);
        setExistingImageUrl(data.image_url);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let image_url = existingImageUrl;
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

    const { error: updateError } = await supabase
      .from('Recipes')
      .update({ 
        title, 
        content, 
        preparation, 
        image_url 
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error al actualizar la receta:', updateError);
    } else {
      alert('Receta actualizada exitosamente');
      navigate('/my-recipes');
    }
  };

  return (
    <div className="edit-recipe-container">
      <form className="edit-recipe-form" onSubmit={handleSubmit}>
        <h2>Editar Receta</h2>
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
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Previsualización" />
            </div>
          ) : (
            existingImageUrl && (
              <div className="image-preview">
                <img src={existingImageUrl} alt="Imagen existente" />
              </div>
            )
          )}
        </div>
        <button type="submit" className="edit-recipe-button">Actualizar</button>
      </form>
    </div>
  );
};

export default EditRecipe;
