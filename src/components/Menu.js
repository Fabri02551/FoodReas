import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Importa tu archivo CSS para los estilos

const Menu = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1>FoodReas</h1>
      </div>
      <ul className="menu-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/recipes">Recetas</Link></li>
        {isAuthenticated && (
          <>
            <li><Link to="/my-recipes">Mis Recetas</Link></li>
            <li><button onClick={onLogout}>Cerrar sesión </button></li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li><Link to="/login">Iniciar sesión </Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
