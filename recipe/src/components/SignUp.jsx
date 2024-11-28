import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdPerson } from 'react-icons/md';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <MdPerson />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <MdEmail />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <MdLock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="visibility-toggle"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
        <div className="social-login">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="google"
          >
            <FaGoogle /> Sign up with Google
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="github"
          >
            <FaGithub /> Sign up with GitHub
          </motion.button>
        </div>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </motion.div>
      <motion.div 
        className="auth-image"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chef-rafiki-eoP1tGiahtOF0xz3teaZHjDu5W0Jg5.png" alt="Chef illustration" />
      </motion.div>
    </div>
  );
};

export default Signup;