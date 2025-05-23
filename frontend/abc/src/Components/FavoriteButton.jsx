import React from 'react';
import axios from 'axios';

export default function FavoriteButton({ bookId, isFavorited, userId, onToggle }) {
  const toggleFavorite = async () => {
    try {
      const endpoint = isFavorited ? 'unfavorite' : 'favorite';
      await axios.post(`http://localhost:9000/books/${bookId}/${endpoint}`, { userId });
      onToggle(); // callback to update parent state
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: isFavorited ? '#e74c3c' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = isFavorited ? '#c0392b' : '#2980b9';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = isFavorited ? '#e74c3c' : '#3498db';
  };

  return (
    <button
      onClick={toggleFavorite}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
    </button>
  );
}
