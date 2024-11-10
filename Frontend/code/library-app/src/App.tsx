import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppNav from './components/AppNav';

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppNav />
      </Router>
    </AuthProvider>
  );
};

export default App;
