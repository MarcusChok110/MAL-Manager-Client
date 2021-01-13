import React, { useEffect, useState } from 'react';

const SearchAnime = (props) => {
  const [data, setData] = useState([1]);
  const query = props.location.search;

  useEffect(() => {
    fetchJSON();
  }, []);

  const renderData = () => {
    if (data === [1]) {
      return <h3>Loading...</h3>;
    } else if (data.length === 0) {
      return <h3>No results found.</h3>;
    } else {
      // return JSON.stringify(data);
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
              <div className="card">
                <img
                  src={val.image_url}
                  alt={`${val.title} Poster`}
                  className="card-img-top img-fluid"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={val.url}>{val.title}</a>
                  </h5>
                  <p className="card-text">{val.synopsis}</p>
                </div>
              </div>
            </div>
          );

          return acc;
        }, [])
        .map((val) => {
          return <div className="row">{val}</div>;
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
