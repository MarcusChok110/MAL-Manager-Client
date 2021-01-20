import React, { useEffect, useState } from 'react';

const STATUS_ENUMS = {
  Watching: 'watching',
  Completed: 'completed',
  'On Hold': 'on_hold',
  Dropped: 'dropped',
  'Plan To Watch': 'plan_to_watch',
};

const SCORE_ENUMS = {
  'Select score': 0,
  '(10) Masterpiece': 10,
  '(9) Great': 9,
  '(8) Very Good': 8,
  '(7) Good': 7,
  '(6) Fine': 6,
  '(5) Average': 5,
  '(4) Bad': 4,
  '(3) Very Bad': 3,
  '(2) Horrible': 2,
  '(1) Appalling': 1,
};

const Anime = ({ match, animeList }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchJSON();
  }, []);

  // status radio buttons for form
  const StatusRadio = ({ listData }) => {
    const [statusData] = listData;
    const radios = [];

    for (let key in STATUS_ENUMS) {
      radios.push(
        <div className="form-check" key={radios.length}>
          <input
            className="form-check-input"
            type="radio"
            name="status"
            value={STATUS_ENUMS[key]}
            id={radios.length}
            defaultChecked={
              statusData
                ? statusData.list_status.status === STATUS_ENUMS[key]
                : false
            }
          />
          <label className="form-check-label" htmlFor={radios.length}>
            {key}
          </label>
        </div>
      );
    }

    return radios;
  };

  // option select for score
  const ScoreOptions = () => {
    const options = [];

    for (let key in SCORE_ENUMS) {
      options.push(
        <option value={SCORE_ENUMS[key]} key={options.length}>
          {key}
        </option>
      );
    }

    return options;
  };

  // form to update anime list status
  const ListForm = ({ list }) => {
    if (list === undefined || list === '') {
      return <p className="lead">Please log in to edit your anime list!</p>;
    } else {
      const listData = inList(list);
      console.log(listData);
      return (
        <>
          <form className="border rounded p-4" action="">
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-2 pt-0">Status</legend>
                <div className="col-10">
                  <StatusRadio listData={listData} />
                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <label
                htmlFor="scoreSelect"
                className="col-form-label col-2 pt-0"
              >
                Score
              </label>
              <select
                name=""
                id="scoreSelect"
                className="form-control col-6 ml-2"
                defaultValue={listData ? listData[0].list_status.score : 0}
              >
                <ScoreOptions />
              </select>
            </div>
          </form>
        </>
      );
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
          <div className="row">
            <ul className="col-12 col-md-4 list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Score</h5>
                <h5>
                  <span className="">{data.score ? data.score : 'N/A'}</span>
                </h5>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Users Scored</h5>
                <h5>
                  <span className="">
                    {data.scored_by ? data.scored_by.toLocaleString() : 'N/A'}
                  </span>
                </h5>
              </li>
            </ul>
            <ul className="col-12 col-md-4 list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Ranked</h5>
                <h5>
                  <span className="">{`${
                    data.rank ? '#' + data.rank.toLocaleString() : 'N/A'
                  }`}</span>
                </h5>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Popularity</h5>
                <h5>
                  <span className="">{`${
                    data.popularity
                      ? '#' + data.popularity.toLocaleString()
                      : 'N/A'
                  }`}</span>
                </h5>
              </li>
            </ul>
            <ul className="col-12 col-md-4 list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Members</h5>
                <h5>
                  <span className="">
                    {data.members ? data.members.toLocaleString() : 'N/A'}
                  </span>
                </h5>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h5 className="lead">Favourites</h5>
                <h5>
                  <span className="">
                    {data.favorites ? data.favorites.toLocaleString() : 'N/A'}
                  </span>
                </h5>
              </li>
            </ul>
          </div>
          <hr />
          <h3>Information</h3>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="col">Type:</th>
                  <td>{data.type}</td>
                </tr>
                <tr>
                  <th scope="col">Episodes:</th>
                  <td>{data.episodes ? data.episodes : 'N/A'}</td>
                </tr>
                <tr>
                  <th scope="col">Status:</th>
                  <td>{data.status}</td>
                </tr>
                <tr>
                  <th scope="col">Aired:</th>
                  <td>{data.aired.string}</td>
                </tr>
                <tr>
                  <th scope="col">Genres:</th>
                  <td>
                    {data.genres
                      .map((val) => val.name)
                      .toString()
                      .replaceAll(',', ', ')}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Rating:</th>
                  <td>{data.rating}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <h3>Edit Anime List Status</h3>
          <ListForm list={animeList} />
          <div className="mb-5"></div>
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
  };

  return (
    <div>
      <DataFormatted />
    </div>
  );
};

export default Anime;
