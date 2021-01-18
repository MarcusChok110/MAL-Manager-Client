import React, { useEffect, useState } from 'react';

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
    const sessionURL = 'http://localhost:8888/session';
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
