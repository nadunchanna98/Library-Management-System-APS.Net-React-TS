import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import AddnewBook from '../pages/AddnewBook';
import BookList from '../pages/BookList';
import EditBook from '../pages/EditBook';
import NotFound from '../pages/NotFound';

const AppNav: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing_page" element={<AddnewBook />} />
          <Route path="/book_list" element={<BookList />} />
          <Route path="/edit_book/:id" element={<EditBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppNav;
