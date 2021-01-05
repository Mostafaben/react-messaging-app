import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './../styles/login_page.css';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const History = useHistory();

  function handleConfirm(e) {
    e.preventDefault();
    History.push('/');
  }

  const handleEmailChange = React.useCallback((e) => {
    setEmail(e.target.value);
  });

  const handlePasswordChange = React.useCallback((e) => {
    setPassword(e.target.value);
  });

  return (
    <div className="mainContainer">
      <form className="card">
        <input
          className="form-control"
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="form-control"
          type="password"
          value={password}
          placeholder="passowrd"
          onChange={handlePasswordChange}
        />

        <p className="link">
          Create Acount ? <Link to="/register">Sign Up</Link>
        </p>

        <button className="btn btn-primary" onClick={handleConfirm}>
          Login
        </button>
      </form>
    </div>
  );
}
