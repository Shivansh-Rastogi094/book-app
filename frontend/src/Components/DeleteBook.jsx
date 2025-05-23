import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    header: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '2rem',
      color: '#2c3e50',
    },
    list: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      padding: '1.5rem',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
    },
    button: {
      padding: '8px 14px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#c0392b',
    },
    noBooks: {
      textAlign: 'center',
      color: '#888',
      marginTop: '2rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}> Delete Books</h2>
      {books.length === 0 ? (
        <p style={styles.noBooks}>No books available</p>
      ) : (
        <div style={styles.list}>
          {books.map((book) => (
            <div
              key={book._id}
              style={styles.card}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.cardHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.card);
              }}
            >
              <span style={styles.title}>{book.title}</span>
              <button
                onClick={() => handleDelete(book._id)}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
