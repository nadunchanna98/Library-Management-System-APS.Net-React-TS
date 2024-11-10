import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../axiosConfig';

interface AuthContextType {
  books: any[]; 
  fetchBookData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<any[]>([]); 

  useEffect(() => {
    fetchBookData();
  }, [books]);

  const fetchBookData = async () => {
    try {
      const response = await api.get('/');
      const bookData = response.data;
      console.log(response.data)
      setBooks(bookData);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ books, fetchBookData }}>
      {children}
    </AuthContext.Provider>
  );
};
