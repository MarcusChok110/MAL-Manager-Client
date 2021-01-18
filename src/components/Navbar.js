import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  // action listener for login button
  const login = async () => {
    // get link to login from api
    const loginURL = 'http://localhost:8888';
    const link = await fetch(`${loginURL}/session/new`);
    const json = await link.json();
    // redirect to login url
    window.location = json.url;
  };

  // action listener for logout button
  const logout = () => {
    props.setUser('');
    localStorage.setItem('auth-token', '');
    window.location = '/';
  };

  // profile component for top right of navbar
  const Profile = () => {
    // if user is logged in, display profile and logout button
    if (props.user) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-danger active"
              href=""
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      // if user is not logged in, display login button
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-primary"
              href=""
              onClick={login}
            >
              Login to MyAnimeList
            </button>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      {/* Brand */}
      <Link to="/" className="navbar-brand">
        MyAnimeList Manager
      </Link>

      {/* Toggler */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              id="navdrop"
              data-toggle="dropdown"
              //aria-haspopup="true"
              aria-expanded="false"
            >
              Lists
            </Link>
            <div className="dropdown-menu" aria-labelledby="navdrop">
              <Link to="/animelist" className="dropdown-item">
                AnimeList
              </Link>
              <Link to="/mangalist" className="dropdown-item">
                MangaList
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/schedule">
              Schedule
            </Link>
          </li>
        </ul>
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
