import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home,
  Navbar,
  AnimeList,
  Search,
  Schedule,
  SearchAnime,
  Anime,
  NotFound,
} from './components/index';
import Login from './api/Login';

function App() {
  // state for user info from MyAnimeList
  const [userToken, setUserToken] = useState();
  const [userData, setUserData] = useState();
  const [animeList, setAnimeList] = useState();

  // grab auth token from localStorage on component mount
  useEffect(() => {
    setUserToken(localStorage.getItem('logged_in') === 'true');
  }, []);

  // every time auth token updates, grab user info from MAL
  useEffect(() => {
    if (!userToken) {
      setUserData('');
      setAnimeList('');
    } else {
      fetchUserData();
      fetchAnimeList();
    }
  }, [userToken]);

  const fetchUserData = async () => {
    // // if not, fetch it from API
    const url = 'http://localhost:8888/user';
    const options = {
      credentials: 'include',
    };
    const response = await fetch(url, options);
    const json = await response.json();
    setUserData(json);
  };

  const fetchAnimeList = async () => {
    // // if not, fetch it from API
    const url = 'http://localhost:8888/animelist';
    const options = {
      credentials: 'include',
    };
    const response = await fetch(url, options);
    const json = await response.json();
    setAnimeList(json);
  };

  return (
    <div>
      <Router>
        <Navbar user={userToken} setUser={setUserToken} />
        <div className="container mt-2">
          <div className="App">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Home {...props} userData={userData} />}
              />
              <Route
                exact
                path="/animelist"
                render={(props) => (
                  <AnimeList {...props} animeList={animeList} />
                )}
              />
              <Route exact path="/search" component={Search} />
              <Route exact path="/schedule" component={Schedule} />
              <Route
                exact
                path="/login"
                user={userToken}
                setUser={setUserToken}
                render={(props) => (
                  <Login {...props} setUserData={setUserData} />
                )}
              />
              <Route exact path="/search/anime" component={SearchAnime} />
              <Route
                exact
                path="/anime/:id"
                render={(props) => <Anime {...props} animeList={animeList} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
