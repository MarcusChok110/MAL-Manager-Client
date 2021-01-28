import React, { useEffect, useState } from 'react';

const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888'
    : 'https://arcane-temple-45992.herokuapp.com';

const Login = (props) => {
  const [success, setSuccess] = useState(0);

  const Message = () => {
    if (success === 1) {
      return <h2 className="text-success">Logged in Successfully!</h2>;
    } else if (success === -1) {
      return <h2 className="text-danger">Failed to Login!</h2>;
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    const sessionURL = `${serverURL}/session`;
    const params = new URLSearchParams(props.location.search);

    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        code: params.get('code'),
        state: params.get('state'),
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(sessionURL, options)
      .then((response) => {
        localStorage.setItem('logged_in', true);
        setSuccess(1);
        setTimeout(() => {
          window.location = '/';
        }, 2000);
      })
      .catch((response) => {
        setSuccess(-1);
        setTimeout(() => {
          window.location = '/';
        }, 2000);
      });
  }, []);

  return (
    <div>
      <h1>Logging in...</h1>
      <Message />
    </div>
  );
};

export default Login;
