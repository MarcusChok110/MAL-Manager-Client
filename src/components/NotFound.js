import React from 'react';

const NotFound = (props) => {
  return (
    <div>
      <h1>Error</h1>
      <hr />
      <p className="lead">
        The page you are looking for is unable to be found.
      </p>
      <p>Your path: {window.location.pathname}</p>
    </div>
  );
};

export default NotFound;
