
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/recipe';
import RecipeDetails from './components/recipeDetails';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/SignUp';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} /> 
        <Route path="/recipe/:id" element={<RecipeDetails />} /> 
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </Router>
  );
};

export default App;
