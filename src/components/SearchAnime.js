import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchAnime = (props) => {
  const [data, setData] = useState();
  const query = props.location.search;

  useEffect(() => {
    fetchJSON();
  }, []);

  const renderData = () => {
    if (data === undefined) {
      return <h3>Loading...</h3>;
    } else if (data.length === 0) {
      return <h3>No results found.</h3>;
    } else {
      return data
        .reduce((acc, val, index) => {
          // 4 columns per row
          const rowIndex = Math.floor(index / 4);

          // initialize rows with empty array
          if (!acc[rowIndex]) {
            acc[rowIndex] = [];
          }

          acc[rowIndex].push(
            <div className="col-6 col-lg-3 mb-3" key={index}>
              <div className="card" style={{ height: '700px' }}>
                <img
                  src={val.image_url}
                  alt={`${val.title} Poster`}
                  className="card-img-top img-fluid"
                />

                <h6 className="card-title text-center card-header">
                  <Link to={`/anime/${val.mal_id}`}>{val.title}</Link>
                </h6>

                <div className="card-body overflow-auto">
                  <div>
                    <p className="card-text">{val.synopsis}</p>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Score:
                    <h5>
                      <span className="badge badge-warning badge-pill">
                        {val.score}
                      </span>
                    </h5>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Members:
                    <h5>
                      <span className="badge badge-warning badge-pill">
                        {val.members.toLocaleString()}
                      </span>
                    </h5>
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
  };

  const fetchJSON = async () => {
    // Promise based implementation for below request (as practice):
    // fetch(`https://api.jikan.moe/v3/search/anime${query}`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setData(response.results);
    //   });

    // async/await implementation:
    const response = await fetch(
      `https://api.jikan.moe/v3/search/anime${query}`
    );
    const result = await response.json();
    const data = result.results;
    setData(data);
  };

  return (
    <div>
      <h1>Search Results</h1>
      {renderData()}
    </div>
  );
};

export default SearchAnime;
