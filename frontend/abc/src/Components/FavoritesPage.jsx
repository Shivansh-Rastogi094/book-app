import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

function FavoritesPage({ userId }) {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    axios.get(`http://localhost:9000/books/favorites/${userId}`)
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '2rem',
      fontSize: '24px',
    },
    message: {
      textAlign: 'center',
      color: '#999',
      fontSize: '18px',
      marginTop: '2rem',
    },
    bookGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌟 My Favorite Books</h2>
      {favorites.length === 0 ? (
        <p style={styles.message}>No favorite books yet.</p>
      ) : (
        <div style={styles.bookGrid}>
          {favorites.map(book => (
            <BookCard
              key={book._id}
              book={book}
              userId={userId}
              onFavoriteToggle={fetchFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
