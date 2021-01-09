import React from 'react';

const Search = (props) => {
  return (
    <div>
      <h1>Search</h1>
      <form action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            placeholder="Search your favourite Anime or Manga!"
          />
          <button type="submit" className="btn btn-primary input-group-append">
            Search!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
