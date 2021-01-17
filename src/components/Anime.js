import React, { useEffect, useState } from 'react';

const Anime = ({ match }) => {
  const [data, setData] = useState();

  useEffect(() => {
    console.log(match);
    fetchJSON();
  }, [match]);

  const DataFormatted = () => {
    if (data === undefined) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          <div className="clearfix">
            <img
              src={data.image_url}
              alt="Anime Poster"
              className="rounded float-left img-fluid m-4"
            />
            <h3 className="display-4 text-center mb-2">{data.title}</h3>
            <p className="card card-block p-2">{data.synopsis}</p>
          </div>
          <p className="">[Cleared]</p>
        </>
      );
    }
  };

  const fetchJSON = async () => {
    const response = await fetch(
      `https://api.jikan.moe/v3/anime/${match.params.id}`
    );
    const result = await response.json();
    setData(result);
    console.log(result);
  };

  return <div>{<DataFormatted />}</div>;
};

export default Anime;
