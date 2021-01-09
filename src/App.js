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
} from './components/index';

function App() {
  // state for user info from MyAnimeList
  const [user, setUser] = useState(false);

  // grab user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user-data');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // update user data in localStorage on component mount and update
  useEffect(() => {
    localStorage.setItem('user-data', user);
  });

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/animelist" component={AnimeList} />
              <Route exact path="/mangalist" component={MangaList} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/schedule" component={Schedule} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
