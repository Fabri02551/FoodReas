import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      // Buscar el usuario por correo electrónico
      const { data: user, error: fetchError } = await supabase
        .from('User')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError) {
        handleError(fetchError);
        return;
      }

      // Verificar la contraseña
      if (user && await bcrypt.compare(password, user.password)) {
        // Almacenar user_id en localStorage
        localStorage.setItem('userId', user.id);
        setIsAuthenticated(true);

        // Autenticación exitosa
        navigate('/'); // Cambia '/dashboard' a la ruta correspondiente
      } else {
        setErrorMessage('Correo electrónico o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error desconocido al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  const handleError = (error) => {
    console.error('Error:', error);
    if (error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('Error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inicio de Sesión</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <button type="submit" className="login-button">Iniciar Sesión</button>
        <button type="button" className="back-button" onClick={handleBack}>Volver</button>
        <p className="register-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
      
    </div>
  );
};

export default Login;
