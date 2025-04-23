import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddBook from './Components/AddBook'
import DeleteBook from './Components/DeleteBook'
import SearchBook from './Components/SearchBook'
import UpdateBook from './Components/UpdateBook'
import ViewBook from './Components/ViewBook'
import './App.css'
import {Link} from 'react-router-dom'

function App() {
  return(
    <div>
      <Router>
        <nav>
          <Link to="/add">Add Book</Link>
          <Link to="/view">View Book</Link>
          <Link to="/search">Search Book</Link>
          <Link to="/update">Update Book</Link>
          <Link to="/delete">Delete Book</Link>
        </nav>
        <Routes>
          <Route path="/add" element={<AddBook />} />
          <Route path="/delete" element={<DeleteBook />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/update" element={<UpdateBook />} />
          <Route path="/view" element={<ViewBook />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App