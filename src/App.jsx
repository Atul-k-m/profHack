import React, { useState } from 'react';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} user={user} />;
      case 'teams':
        return <Teams setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} user={user} />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;