import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddBook from './Components/AddBook';
import DeleteBook from './Components/DeleteBook';
import SearchBook from './Components/SearchBook';
import UpdateBook from './Components/UpdateBook';
import ViewBook from './Components/ViewBook';
import FavoritesPage from './Components/FavoritesPage'; // 🔥 Import
import './App.css';

function App() {
  const userId = "123"; // Temporary hardcoded user ID

  return (
    <div>
      <Router>
        <nav>
          <Link to="/add">Add Book</Link>
          <Link to="/view">View Book</Link>
          <Link to="/search">Search Book</Link>
          <Link to="/update">Update Book</Link>
          <Link to="/delete">Delete Book</Link>
          <Link to="/favorites">Favorites</Link> {/* 🔥 New link */}
        </nav>
        <Routes>
          <Route path="/add" element={<AddBook />} />
          <Route path="/delete" element={<DeleteBook />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/update" element={<UpdateBook />} />
          <Route path="/view" element={<ViewBook userId={userId} />} /> {/* 🔥 Pass userId */}
          <Route path="/favorites" element={<FavoritesPage userId={userId} />} /> {/* 🔥 New route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
