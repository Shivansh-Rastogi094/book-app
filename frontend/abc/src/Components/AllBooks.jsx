import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Components/BookCard';

export default function AllBooks({ userId }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      {books.map(book => (
        <BookCard key={book._id} book={book} userId={userId} />
      ))}
    </div>
  );
}
