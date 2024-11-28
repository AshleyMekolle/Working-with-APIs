
import { motion } from 'framer-motion';
import { MdRestaurantMenu, MdFavorite, MdPeople } from 'react-icons/md';
import './About.css';

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        About Tasty Delights
      </motion.h1>
      
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p>Welcome to Tasty Delights, your ultimate destination for culinary inspiration!</p>
        
        <motion.div className="feature" whileHover={{ scale: 1.05 }}>
          <MdRestaurantMenu />
          <h2>Diverse Recipes</h2>
          <p>Explore a wide variety of recipes from around the world, suitable for all skill levels.</p>
        </motion.div>
        
        <motion.div className="feature" whileHover={{ scale: 1.05 }}>
          <MdFavorite />
          <h2>Save Favorites</h2>
          <p>Create your personal collection of favorite recipes for quick and easy access.</p>
        </motion.div>
        
        <motion.div className="feature" whileHover={{ scale: 1.05 }}>
          <MdPeople />
          <h2>Community</h2>
          <p>Join our community of food lovers, share your creations, and get inspired by others.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;