import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';


function BookCard({ book, userId, onFavoriteToggle }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(book.favoritedBy?.includes(userId));
  }, [book, userId]);

  const toggleFavorite = async () => {
    try {
      const endpoint = isFavorited ? 'unfavorite' : 'favorite';
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books/${book._id}/${endpoint}`, { userId });
      setIsFavorited(prev => !prev);
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const styles = {
    card: {
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#2c3e50',
    },
    author: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '0.3rem',
    },
    date: {
      fontSize: '0.9rem',
      color: '#888',
      marginBottom: '1rem',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: isFavorited ? '#e74c3c' : '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.95rem',
    }
  };

  return (
    <div style={styles.card}>
      <img src={book.image} alt={book.title} style={styles.image} />
      <div style={styles.title}>{book.title}</div>
      <div style={styles.author}>By {book.author}</div>
      <div style={styles.date}>Published: {book.date}</div>
      <button style={styles.button} onClick={toggleFavorite}>
        {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
      </button>
    </div>
  );
}

export default BookCard;
