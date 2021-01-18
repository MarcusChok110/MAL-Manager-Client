import React, { useEffect, useState } from 'react';

const Home = ({ userData }) => {
  const Greeting = () => {
    if (userData) {
      return <p>{JSON.stringify(userData)}</p>;
    } else if (userData === '') {
      return (
        <>
          <hr />
          <h2>Hi, stranger!</h2>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Greeting />
    </div>
  );
};

export default Home;
