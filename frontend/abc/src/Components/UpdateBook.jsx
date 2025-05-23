import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [bookId, setBookId] = useState('');
  const [bookData, setBookData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    image: '',
  });

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    button: {
      padding: '0.75rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '1rem',
      textAlign: 'center',
    },
  };

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/books`);
      const book = res.data.find((book) => book._id === bookId);
      if (book) {
        setBookData(book);
        setFormData(book);
      } else {
        alert('Book not found!');
        setBookData(null);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/books/${bookId}`, formData);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Book</h1>
      <form style={styles.form} onSubmit={(e) => { e.preventDefault(); fetchBook(); }}>
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Fetch Book</button>
      </form>

      {bookData && (
        <>
          <p style={styles.subtitle}>Edit book details below:</p>
          <form onSubmit={handleUpdate} style={styles.form}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Update Book</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateBook;
