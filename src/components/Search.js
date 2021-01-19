import React, { useState } from 'react';
import searchEnums from '../api/searchEnums';
import OptionSelect from './OptionSelect';

const Search = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const TypeSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.type}
        defaultValue="anime"
        defaultMsg="Select type"
        label="Type:"
      />
    );
  };

  const ScoreSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.score}
        defaultValue="0.0"
        defaultMsg="Select minimum score"
        label="Score:"
      />
    );
  };

  const StatusSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.status}
        defaultValue=""
        defaultMsg="Select status"
        label="Status:"
      />
    );
  };

  const RatedSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.rated}
        defaultValue=""
        defaultMsg="Select rating"
        label="Rating: "
      />
    );
  };

  const OrderSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.order_by}
        defaultValue="title"
        defaultMsg="Select order of results"
        label="Order By:"
      />
    );
  };

  const SortSelect = () => {
    return (
      <OptionSelect
        options={searchEnums.sort}
        defaultValue="ascending"
        defaultMsg="Select sort order"
        label="Sort By:"
      />
    );
  };

  const GenreSelect = () => {
    const genres = searchEnums.genre;

    const renderGenres = () => {
      return Object.keys(genres.data)
        .reduce((acc, val, index) => {
          const numCols = 6;
          const rowIndex = Math.floor(index / numCols);

          if (!acc[rowIndex]) {
            acc.push([]);
          }

          acc[rowIndex].push(
            <div key={index - 1} className="col-6 col-sm-4 col-lg-2 mb-2">
              <input
                name={genres.name}
                value={genres.data[val]}
                className="form-check-input"
                type="checkbox"
                id={genres.data[val]}
                key={index + 1}
              />
              <label
                key={index}
                className="form-check-label"
                htmlFor={genres.data[val]}
              >
                {val}
              </label>
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
    };

    return (
      <div className="form-group mt-3">
        <div className="row">
          <label className="col-6 mb-4" htmlFor={genres.name + '-input'}>
            Select Genres:
          </label>
        </div>
        <div className="form-check">{renderGenres()}</div>
      </div>
    );
  };

  const AdvancedOptions = () => {
    return (
      <div>
        <button
          type="button"
          onClick={toggleShowOptions}
          className="btn btn-warning mt-4 mb-2"
        >
          Show Advanced Options
        </button>
        {showOptions ? (
          <div>
            <TypeSelect />
            <ScoreSelect />
            <StatusSelect />
            <RatedSelect />
            <OrderSelect />
            <SortSelect />
            <GenreSelect />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Search</h1>
      <form action="/search/anime">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="q"
            id=""
            placeholder="Search your favourite Anime!"
            required
            minLength="3"
          />
          <button type="submit" className="btn btn-primary input-group-append">
            Search!
          </button>
        </div>
        <AdvancedOptions />
      </form>
    </div>
  );
};

export default Search;
