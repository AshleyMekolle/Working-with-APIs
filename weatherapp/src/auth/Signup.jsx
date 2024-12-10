import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import '../auth/Auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // Redirect or update state after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect or update state after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubSignup = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect or update state after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sign Up for WeatherTimes
      </motion.h2>
      <motion.form 
        onSubmit={handleEmailSignup}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="input-group">
          <FaUser />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </motion.form>
      <div className="auth-divider">
        <span>or</span>
      </div>
      <div className="social-auth">
        <motion.button 
          onClick={handleGoogleSignup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="google-btn"
        >
          <FaGoogle /> Sign up with Google
        </motion.button>
        <motion.button 
          onClick={handleGithubSignup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="github-btn"
        >
          <FaGithub /> Sign up with GitHub
        </motion.button>
      </div>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </motion.div>
  );
}

export default Signup;