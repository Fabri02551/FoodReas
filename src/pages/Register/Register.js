// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar datos adicionales en la tabla User
      const { error: insertError } = await supabase
        .from('User')
        .insert([
          {
            first_name: name,
            last_name: lastName,
            username: username,
            email: email,
            password: hashedPassword, // Almacenar la contraseña hasheada
          }
        ]);

      if (insertError) {
        handleError(insertError);
        return;
      }

      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage('Error desconocido al registrar. Por favor, intenta de nuevo más tarde.');
    }
  };

  const handleError = (error) => {
    console.error('Error:', error);
    if (error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('Error al registrar usuario. Por favor, intenta de nuevo más tarde.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Registrar</button>
        <button type="button" className="back-button" onClick={handleBack}>Volver</button>
      </form>
    </div>
  );
};

export default Register;
