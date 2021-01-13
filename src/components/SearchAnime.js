import React, { useEffect, useState } from 'react';

const SearchAnime = (props) => {
  const [data, setData] = useState();
  const query = props.location.search;

  useEffect(() => {
    fetchJSON();
  }, []);

  const fetchJSON = async () => {
    fetch(`https://api.jikan.moe/v3/search/anime${query}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(JSON.stringify(response));
      });
  };

  return (
    <div>
      <h1>Search Results</h1>
      {data}
    </div>
  );
};

export default SearchAnime;
