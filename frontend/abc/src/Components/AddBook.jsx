import React from 'react'
import axios from 'axios'

const AddBook = () => {
  const handleBook = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const date = e.target.date.value
    const image = e.target.image.value
    const newBook = { title, author, date, image }
    try {
      const response = await axios.post("http://localhost:9000/books", newBook)
      alert(response.data)
    } catch (error) {
        alert("Error adding book:", error)
    }
  }

  // Inline CSS styles as JS objects
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
    success: {
      textAlign: 'center',
      color: 'green',
      marginTop: '2rem',
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Book</h1>
      <form onSubmit={handleBook} style={styles.form}>
        <input type="text" name="title" placeholder="Title" required style={styles.input} />
        <input type="text" name="author" placeholder="Author" required style={styles.input} />
        <input type="text" name="date" placeholder="Date" required style={styles.input} />
        <input type="text" name="image" placeholder="Image URL" required style={styles.input} />
        <button type="submit" style={styles.button}>Add Book</button>
      </form>
      {/* <h2 style={styles.success}>Book Added Successfully</h2> */}
    </div>
  )
}

export default AddBook
