import React, { useEffect, useState } from 'react';

const Home = (props) => {
  const [userData, setUserData] = useState('');
  const Greeting = () => {};
  const token = localStorage.getItem('auth-token');
  useEffect(() => {
    if (token) {
      fetch('https://api.myanimelist.net/v2/users/@me', {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
      });
    }
  });
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
