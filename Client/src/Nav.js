import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn'); 

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {location.pathname !== '/' && (
        <Link className="navbar-brand" to="/">Home</Link>
      )}
      {location.pathname !== '/chat' &&(
        <Link className="navbar-brand" to="/chat">Chat-box</Link>
      )}
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {location.pathname === '/signup'  &&(
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
          {location.pathname !== '/signup'  && isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          )}
          <li className="nav-item">
            {location.pathname !== '/login' && location.pathname !== '/signup' && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
