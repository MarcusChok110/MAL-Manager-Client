import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home,
  Navbar,
  AnimeList,
  MangaList,
  Search,
  Schedule,
  SearchAnime,
  Anime,
} from './components/index';
import Login from './api/Login';

function App() {
  // state for user info from MyAnimeList
  const [user, setUser] = useState('');

  // grab user data from localStorage on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      setUser(authToken);
    }
  }, []);

  // update user data in localStorage on component mount and update
  useEffect(() => {
    localStorage.setItem('auth-token', user);
  });

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-2">
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" user={user} component={Home} />
              <Route exact path="/animelist" component={AnimeList} />
              <Route exact path="/mangalist" component={MangaList} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/schedule" component={Schedule} />
              <Route
                exact
                path="/login"
                user={user}
                setUser={setUser}
                component={Login}
              />
              <Route exact path="/search/anime" component={SearchAnime} />
              <Route exact path="/anime/:id" component={Anime} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
