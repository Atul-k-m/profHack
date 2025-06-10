import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} />}
          />

          
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/teams"
            element={
              user ? (
                <Teams user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;