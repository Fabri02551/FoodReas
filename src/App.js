import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe'; // Importar ViewRecipe
import EditRecipe from './pages/EditRecipe/EditRecipe'; // Importar EditRecipe
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica el estado de autenticación al cargar la página
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

const AppContent = ({ isAuthenticated, handleLogout, setIsAuthenticated }) => {
  const location = useLocation();
  const hideMenu = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideMenu && <Menu isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <div className={hideMenu ? "full-content" : "content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/my-recipes" element={isAuthenticated ? <MyRecipes /> : <Navigate to="/login" />} />
          <Route path="/create-recipe" element={isAuthenticated ? <CreateRecipe /> : <Navigate to="/login" />} />
          <Route path="/viewRecipe/:id" element={isAuthenticated ? <ViewRecipe /> : <Navigate to="/login" />} />
          <Route path="/editRecipe/:id" element={isAuthenticated ? <EditRecipe /> : <Navigate to="/login" />} /> {/* Nueva ruta */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
