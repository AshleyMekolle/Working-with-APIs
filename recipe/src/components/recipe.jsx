import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import {MdFavorite, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Header from './Header';
import RecipeDetails from './recipeDetails';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './recipe.css';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Simulating a logged-in user

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.meals || []);
        setFilteredRecipes(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchRecipes();
    fetchCategories();

    // Simulating a logged-in user
    setCurrentUser({ id: '1', name: 'John Doe' });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const handleLike = (id) => {
    if (!currentUser) {
      alert('Please sign in to like recipes');
      return;
    }

    setRecipes(recipes.map(recipe => 
      recipe.idMeal === id 
        ? { 
            ...recipe, 
            likes: recipe.likes 
              ? recipe.likes.includes(currentUser.id)
                ? recipe.likes.filter(userId => userId !== currentUser.id)
                : [...recipe.likes, currentUser.id]
              : [currentUser.id]
          }
        : recipe
    ));
    setFilteredRecipes(filteredRecipes.map(recipe => 
      recipe.idMeal === id 
        ? { 
            ...recipe, 
            likes: recipe.likes 
              ? recipe.likes.includes(currentUser.id)
                ? recipe.likes.filter(userId => userId !== currentUser.id)
                : [...recipe.likes, currentUser.id]
              : [currentUser.id]
          }
        : recipe
    ));
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  if (loading) {
    return (
      <div className="loading">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="loading-icon"
        />
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="recipe-app">
      <Header categories={categories} currentUser={currentUser} />
      <main>
        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a dish..."
              className="search-input"
            />
          </div>
        </section>

        <section className="featured-recipes">
          <h2>Featured Recipes</h2>
          <Slider {...carouselSettings}>
            {recipes.slice(0, 5).map((recipe) => (
              <div key={recipe.idMeal} className="carousel-slide">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div className="carousel-caption">
                  <h3>{recipe.strMeal}</h3>
                  <p>{recipe.strArea} Cuisine</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="recipe-grid">
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.idMeal}
                className="recipe-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleRecipeClick(recipe)}
              >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div className="recipe-info">
                  <h3>{recipe.strMeal}</h3>
                  <p>{recipe.strArea} Cuisine</p>
                  <button onClick={(e) => { e.stopPropagation(); handleLike(recipe.idMeal); }} className="like-button">
                    <MdFavorite color={recipe.likes && recipe.likes.includes(currentUser?.id) ? 'red' : 'gray'} />
                    {recipe.likes ? recipe.likes.length : 0}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {selectedRecipe && (
        <RecipeDetails 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
          currentUser={currentUser}
          onLike={handleLike}
        />
      )}
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <MdChevronRight />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <MdChevronLeft />
    </div>
  );
};

export default RecipeApp;