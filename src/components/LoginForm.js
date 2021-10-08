import React, { useState } from 'react';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    props.onSubmit({ username, password });
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {props.children}
      <form onSubmit={handleLogin}>
        <div>
					username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
					password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
