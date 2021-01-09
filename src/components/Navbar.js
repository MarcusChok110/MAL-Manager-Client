import React from 'react';

const Navbar = (props) => {
  const login = () => {
    props.setUser(true);
  };

  const logout = () => {
    props.setUser(false);
  };

  const Profile = () => {
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
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-success"
              href=""
              onClick={login}
            >
              Login
            </button>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      {/* Brand */}
      <a href="/" className="navbar-brand">
        MyAnimeList Manager
      </a>

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
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navdrop"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Lists
            </a>
            <div className="dropdown-menu" aria-labelledby="navdrop">
              <a href="/animelist" className="dropdown-item">
                AnimeList
              </a>
              <a href="/mangalist" className="dropdown-item">
                MangaList
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">
              Search
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/schedule">
              Schedule
            </a>
          </li>
        </ul>
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
