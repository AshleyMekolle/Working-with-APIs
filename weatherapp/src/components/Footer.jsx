import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <p>
          Made with <FaHeart className="heart-icon" /> by AshleyMekolle
        </p>
        <p>&copy; 2023 WeatherTimes. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;