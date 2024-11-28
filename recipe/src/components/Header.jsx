/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { MdFoodBank, MdExpandMore } from 'react-icons/md';
import './Header.css';

const Header = ({ categories, currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="logo">
        <MdFoodBank />
        <h1>Tasty Delights</h1>
      </div>
      <nav>
        <div className="category-dropdown">
         <a href='/login'>Login</a>
        </div>
        <a href="/about">About</a>
        {currentUser ? (
          <span>Welcome, {currentUser.name}</span>
        ) : (
          <a href="/signin">Sign In</a>
        )}
      </nav>
    </header>
  );
};

export default Header;