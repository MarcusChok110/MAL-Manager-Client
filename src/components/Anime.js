import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

const UPDATING_ENUMS = {
  NOT_UPDATING: 0,
  UPDATING: 1,
  FINISHED: 2,
  ERROR: 3,
};

const Anime = ({ match, animeList }) => {
  const [data, setData] = useState();
  const [updating, setUpdating] = useState(0);

  // refs for buttons
  const updateBtnRef = useRef(null);
  const resetBtnRef = useRef(null);
  const deleteBtnRef = useRef(null);

  // refs for form fields
  const formRef = useRef(null);

  // misc refs
  const bottomDivRef = useRef(null);

  useEffect(() => {
    switch (updating) {
      case UPDATING_ENUMS.NOT_UPDATING:
        break;
      case UPDATING_ENUMS.UPDATING:
      case UPDATING_ENUMS.FINISHED:
        bottomDivRef.current.scrollIntoView({ behavior: 'smooth' });
        setBtnEnabled(false);
        break;
      default:
    }
  }, [updating]);

  useEffect(() => {
    fetchJSON();
  }, []);

  const deleteEntry = () => {
    if (animeList && inList(animeList).length > 0) {
      const url = `http://localhost:8888/animelist/${match.params.id}`;
      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      setUpdating(UPDATING_ENUMS.UPDATING);
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.success === true) {
            setUpdating(UPDATING_ENUMS.FINISHED);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            setUpdating(UPDATING_ENUMS.ERROR);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } else {
      alert("You can't delete an entry that doesn't exist!");
    }
  };

  const updateEntry = (e) => {
    e.preventDefault();

    const url = `http://localhost:8888/animelist/${match.params.id}`;
    const requestBody = formToJSON(formRef);
    const options = {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setUpdating(UPDATING_ENUMS.UPDATING);
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          setUpdating(UPDATING_ENUMS.FINISHED);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setUpdating(UPDATING_ENUMS.ERROR);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

  // converts form data to an object
  function formToJSON(ref) {
    const data = new FormData(ref.current);
    const json = {};

    for (let item of data.entries()) {
      json[item[0]] = item[1];
    }

    return json;
  }

  // enable / disable the update/reset/delete buttons
  function setBtnEnabled(bool) {
    updateBtnRef.current.disabled = !bool;
    resetBtnRef.current.disabled = !bool;
    deleteBtnRef.current.disabled = !bool;
  }

  // shows update message when Update/Delete buttons are clicked
  const UpdateLabel = () => {
    switch (updating) {
      case UPDATING_ENUMS.NOT_UPDATING:
        return null;
      case UPDATING_ENUMS.UPDATING:
        return <h2>Updating...</h2>;
      case UPDATING_ENUMS.FINISHED:
        return <h2 className="text-success">Updated Successfully!</h2>;
      case UPDATING_ENUMS.ERROR:
      default:
        return <h2 className="text-danger">Something went wrong!</h2>;
    }
  };

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
            required
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

  // modal which appears when delete button is clicked
  const DeleteModal = () => {
    return (
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              Are you sure you want to delete your list entry?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={deleteEntry}
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // form to update anime list status
  const ListForm = ({ list }) => {
    if (list === undefined || list === '') {
      return <p className="lead">Please log in to edit your anime list!</p>;
    } else {
      const listData = inList(list);
      return (
        <>
          <form className="border rounded p-4" action="" ref={formRef}>
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-5 col-md-4 col-lg-3 pt-0">
                  Status
                </legend>
                <div className="col-7">
                  <StatusRadio listData={listData} />
                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <label
                htmlFor="scoreSelect"
                className="col-form-label col-5 col-md-4 col-lg-3"
              >
                Score
              </label>
              <select
                name="score"
                id="scoreSelect"
                className="form-control col-6 col-md-4 col-lg-3 ml-2"
                defaultValue={listData[0] ? listData[0].list_status.score : 0}
                required
              >
                <ScoreOptions />
              </select>
            </div>
            <div className="form-group row">
              <label
                htmlFor="watched"
                className="col-form-label col-5 col-md-4 col-lg-3"
              >
                Episodes Watched
              </label>
              <input
                className="form-control col-4 col-md-4 col-lg-3 ml-2 pl-3"
                type="number"
                name="num_watched_episodes"
                id="watched"
                min="0"
                max={data.episodes ? data.episodes : 0}
                step="1"
                defaultValue={
                  listData[0] ? listData[0].list_status.num_episodes_watched : 0
                }
                required
              />
              <div className="col-2 col-lg-1 pt-1">
                / {data.episodes ? data.episodes : 0}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-4">
                <button
                  className="btn btn-primary"
                  type="button"
                  ref={updateBtnRef}
                  onClick={updateEntry}
                >
                  Update
                </button>
              </div>
              <div className="col-4 text-center">
                <button
                  className="btn btn-warning"
                  type="reset"
                  ref={resetBtnRef}
                >
                  Reset
                </button>
              </div>
              <div className="col-4 text-right">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#deleteModal"
                  ref={deleteBtnRef}
                >
                  Delete
                </button>
                <DeleteModal />
              </div>
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

  // converts related anime object to paragraph to be displayed
  function paragraphFromRelated(relObj) {
    if (Object.keys(relObj).length > 0) {
      const arr = Object.values(relObj);

      while (Array.isArray(arr[0])) {
        const current = arr.shift();
        arr.push(...current);
      }

      const filtered = arr.filter((val) => val.type === 'anime');

      console.log(filtered);
      return filtered.map((val, index) => {
        return (
          <a href={`/anime/${val.mal_id}`}>
            {val.name + (index < filtered.length - 1 ? ', ' : '')}
          </a>
        );
      });
    } else {
      return '';
    }
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
              <div className="card card-block p-2">
                <h5>Synopsis</h5>
                <hr className="mt-0 mb-2" />
                <p>{data.synopsis}</p>
              </div>
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
                <tr>
                  <th scope="col">Related:</th>
                  <td>{paragraphFromRelated(data.related)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="mt-0" />
          <h3>Edit Anime List Status</h3>
          <ListForm list={animeList} />
          <div className="mb-4"></div>
          <UpdateLabel />
          <div className="mt-5" ref={bottomDivRef}></div>
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
