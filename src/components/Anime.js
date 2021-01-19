import React, { useEffect, useState } from 'react';

const Anime = ({ match, animeList }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchJSON();
  }, []);

  // form to update anime list status
  const ListForm = ({ list }) => {
    if (list === undefined || list === '') {
      return <p className="lead">Please log in to edit your anime list!</p>;
    } else {
      const listData = inList(list);
      console.log(listData);
      return <div>{JSON.stringify(listData)}</div>;
    }
  };

  // checks if the anime is in the user's anime list, and returns it if it is
  function inList(list) {
    const found = list.data.filter((val) => {
      return val.node.id === data.mal_id;
    });

    return found ? found : false;
  }

  const DataFormatted = () => {
    if (data === undefined) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          <div className="row">
            <div className="col-md-12 col-lg-3 text-center">
              <img
                src={data.image_url}
                alt="Anime Poster"
                className="rounded img-fluid m-4 mx-auto"
              />
            </div>
            <div className="col-md-12 col-lg-9">
              <h3 className="display-4 text-center mb-2">{data.title}</h3>
              <p className="card card-block p-2">{data.synopsis}</p>
            </div>
          </div>
          <hr />
          <h3>Edit Anime List Status</h3>
          <ListForm list={animeList} />
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

  return (
    <div>
      <DataFormatted />
    </div>
  );
};

export default Anime;
