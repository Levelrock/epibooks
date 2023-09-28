import React from 'react';
import Home from './Pages/Home';
import BookDetails from './Pages/BookDetails';
import ErrorNotFound from './Pages/ErrorNotFound';
import PostContext from './Context/PostContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const App = () => {
  return (
    <PostContext>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/bookdetail/:bookasin" element={<BookDetails />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </PostContext>
  );
}

export default App;