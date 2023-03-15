
import React from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './pages/Home';

import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-book' element={<AddBook/>} />
        <Route path='/edit-book/:bookId' element={<EditBook/>}/>
        <Route path='/book-detail/:bookId' element={<BookDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
