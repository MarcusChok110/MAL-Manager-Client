import React from 'react';
import { Link } from 'react-router-dom';

const AnimeList = ({ animeList }) => {
  const titleClass = 'display-4';

  const Category = ({ list, title }) => {
    const formatScore = (score) => (score === 0 ? '-' : score);
    const formatEpisodes = (episodes) => episodes.toLocaleString();

    return (
      <div>
        <h2 className={titleClass}>{title}</h2>
        {(() => {
          if (list.length === 0) {
            return <p className="lead">No Anime found for this category!</p>;
          } else {
            return list
              .reduce((acc, val, index) => {
                // 4 columns per row
                const rowIndex = Math.floor(index / 4);

                // initialize rows with empty array
                if (!acc[rowIndex]) {
                  acc[rowIndex] = [];
                }

                acc[rowIndex].push(
                  <div className="col-6 col-lg-3 mb-3" key={index}>
                    <div className="card">
                      <img
                        src={val.node.main_picture.medium}
                        alt={`${val.node.title} Poster`}
                        className="card-img-top img-fluid"
                      />
                      <h6 className="card-title card-header text-center">
                        <Link to={`/anime/${val.node.id}`}>
                          {val.node.title}
                        </Link>
                      </h6>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Score:
                          <span className="badge badge-info badge-pill">
                            {formatScore(val.list_status.score)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Episodes Watched:
                          <span className="badge badge-info badge-pill">
                            {formatEpisodes(
                              val.list_status.num_episodes_watched
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
                return acc;
              }, [])
              .map((val, index) => {
                return (
                  <div className="row" key={index}>
                    {val}
                  </div>
                );
              });
          }
        })()}
      </div>
    );
  };

  const ListFormatted = () => {
    if (animeList) {
      const {
        watching,
        completed,
        on_hold,
        dropped,
        plan_to_watch,
      } = sortAnime(animeList.data);

      return (
        <div>
          <Category list={watching} title="Currently Watching" />
          <hr />
          <Category list={completed} title="Completed" />
          <hr />
          <Category list={on_hold} title="On Hold" />
          <hr />
          <Category list={dropped} title="Dropped" />
          <hr />
          <Category list={plan_to_watch} title="Plan To Watch" />
        </div>
      );
    } else if (animeList === '') {
      return (
        <p>
          Please log with your MyAnimeList account if you want to see your Anime
          List!
        </p>
      );
    } else {
      return null;
    }
  };

  // sort anime list alphabetically in the given categories of status
  function sortAnime(list) {
    const watching = [];
    const completed = [];
    const on_hold = [];
    const dropped = [];
    const plan_to_watch = [];

    const listSorted = { watching, completed, on_hold, dropped, plan_to_watch };

    for (const item of list) {
      const status = item.list_status.status;

      if (status === 'watching') {
        watching.push(item);
      } else if (status === 'completed') {
        completed.push(item);
      } else if (status === 'on_hold') {
        on_hold.push(item);
      } else if (status === 'dropped') {
        dropped.push(item);
      } else if (status === 'plan_to_watch') {
        plan_to_watch.push(item);
      }
    }

    // sort each category alphabetically by title
    for (const prop in listSorted) {
      listSorted[prop].sort((a, b) =>
        a.node.title < b.node.title ? -1 : a.node.title > b.node.title ? 1 : 0
      );
    }

    return listSorted;
  }

  return (
    <div>
      <h1>Your Anime List</h1>
      <hr />
      <ListFormatted />
    </div>
  );
};

export default AnimeList;
