import React, { useState } from 'react';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'hero':
        return <Hero setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} user={user} />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;