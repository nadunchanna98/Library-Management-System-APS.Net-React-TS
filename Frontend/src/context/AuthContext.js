import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await api.get('/');
      const bookData = response.data;
      setBooks(bookData);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ books,fetchBookData }}>
      {children}
    </AuthContext.Provider>
  );
};