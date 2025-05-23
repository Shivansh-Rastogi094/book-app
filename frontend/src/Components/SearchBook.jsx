import React, { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';


const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search?title=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  const styles = {
    wrapper: {
      maxWidth: '1100px',
      margin: '2rem auto',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
    },
    searchBar: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    input: {
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      width: '300px',
      marginRight: '10px',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    author: {
      color: '#555',
      marginBottom: '0.5rem',
    },
    date: {
      fontSize: '0.9rem',
      color: '#888',
    },
    noResults: {
      textAlign: 'center',
      color: '#888',
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>🔎 Search Books</h2>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Search
        </button>
      </div>

      <div style={styles.grid}>
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img src={book.image} alt={book.title} style={styles.image} />
              <div style={styles.title}>{book.title}</div>
              <div style={styles.author}>By {book.author}</div>
              <div style={styles.date}>Published: {book.date}</div>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
