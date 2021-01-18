import React, { useEffect, useState } from 'react';

const Home = ({ userData }) => {
  const Greeting = () => {
    if (userData) {
      const stats = userData.anime_statistics;
      return (
        <>
          <h2>Hi, {userData.name}!</h2>
          <p className="lead">Here's some of your data...</p>
          <ul className="list-group">
            <h5>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Mean Score:
                <span className="badge badge-danger badge-pill">
                  {stats.mean_score.toFixed(2).toLocaleString()}
                </span>
              </li>
            </h5>
            <h5>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Number of Episodes Watched:
                <span className="badge badge-success badge-pill">
                  {stats.num_episodes.toLocaleString()}
                </span>
              </li>
            </h5>
            <h5>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Number of Hours Watched:
                <span className="badge badge-info badge-pill">
                  {Math.round(stats.num_days * 24).toLocaleString()}
                </span>
              </li>
            </h5>
            <h5>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Number of Anime Finished:
                <span className="badge badge-primary badge-pill">
                  {stats.num_items_completed.toLocaleString()}
                </span>
              </li>
            </h5>
            <h5>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Number of Anime you "Plan" to Watch:
                <span className="badge badge-secondary badge-pill">
                  {stats.num_items_plan_to_watch}
                </span>
              </li>
            </h5>
          </ul>
        </>
      );
    } else if (userData === '') {
      return (
        <>
          <h2 className="mb-3">Hi, stranger!</h2>
          <p className="lead">
            To use most of this site's functionality, you will need to log in to
            your MyAnimeList account.
          </p>
          <p className="lead">
            If you don't want to, that's okay! You can still use the Search
            feature to look up your favourite Anime!
          </p>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <hr />
      <Greeting />
    </div>
  );
};

export default Home;
