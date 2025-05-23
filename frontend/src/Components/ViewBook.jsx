import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteButton from './FavoriteButton'; // Make sure the path is correct

function ViewBook({ userId }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`)
    .then((res) => {
      console.log("Fetched data:", res.data);  // Add this
      setBooks(res.data);
    })
    .catch((err) => console.error(err))
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '3rem auto',
      padding: '1rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: 'white',
      padding: '1rem',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginBottom: '1rem',
    },
    bookInfo: {
      textAlign: 'center',
    },
    titleText: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    authorText: {
      color: '#555',
      marginBottom: '0.5rem',
    },
    dateText: {
      color: '#888',
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
    },
    favoriteBtn: {
      marginTop: '0.5rem',
    },
    emptyText: {
      textAlign: 'center',
      color: '#888',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 All Books</h2>
      {books.length === 0 ? (
        <p style={styles.emptyText}>No books found.</p>
      ) : (
        <div style={styles.grid}>
          {books.map((book) => {
            const isFavorited = book.favoritedBy?.includes(userId);

            return (
              <div key={book._id} style={styles.card}>
                <img src={book.image} alt={book.title} style={styles.image} />
                <div style={styles.bookInfo}>
                  <div style={styles.titleText}>{book.title}</div>
                  <div style={styles.authorText}>By {book.author}</div>
                  <div style={styles.dateText}>Published: {book.date}</div>
                </div>
                <div style={styles.favoriteBtn}>
                  <FavoriteButton
                    bookId={book._id}
                    isFavorited={isFavorited}
                    userId={userId}
                    onToggle={fetchBooks}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ViewBook;
