
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTasks } from 'react-icons/fa';
import { toggleDarkMode } from '../features/theme/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="app-header">
      <div className="logo">
        <FaTasks className="logo-icon" />
        <h1>Task Manager</h1>
      </div>

      <button onClick={handleToggle} className="dark-btn">
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
};

export default Header;

