// src/routes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EditRecipe from './pages/EditRecipe/EditRecipe'; // Importar el nuevo componente

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
