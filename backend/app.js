const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Connection error:", error));

// Book schema
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String,
  image: String,
  favoritedBy: [String] // array of user IDs
});

// Book model
const Book = mongoose.model('MyBook', BookSchema);

// Add a book
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(200).send('Book added');
  } catch (error) {
    console.error("Error saving book:", error.message);
    res.status(500).send('Server Error');
  }
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Search books by title
app.get('/search', async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.find({ title: { $regex: title, $options: 'i' } });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete book
app.delete('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting book');
  }
});

// Favorite a book
app.post('/books/:id/favorite', async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book.favoritedBy.includes(userId)) {
      book.favoritedBy.push(userId);
      await book.save();
    }
    res.status(200).json({ message: 'Book favorited', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unfavorite a book
app.post('/books/:id/unfavorite', async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  try {
    const book = await Book.findById(bookId);
    book.favoritedBy = book.favoritedBy.filter(id => id !== userId);
    await book.save();
    res.status(200).json({ message: 'Book unfavorited', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get favorite books for a user
app.get('/books/favorites/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const books = await Book.find({ favoritedBy: userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update book code

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send('Server Error');
  }
});


// Start server
app.listen(9000, () => {
  console.log('Server is running on port 9000');
});
