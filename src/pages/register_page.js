import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [fullName, setFullName] = React.useState('');
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

  const handlePasswordConfirmationChange = React.useCallback((e) => {
    setPasswordConfirmation(e.target.value);
  });

  const handleFullNameChange = React.useCallback((e) => {
    setFullName(e.target.value);
  });
  return (
    <div className="mainContainer">
      <form className="card">
        <input
          className="form-control"
          type="text"
          placeholder="full name"
          value={fullName}
          onChange={handleFullNameChange}
        />
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
        <input
          className="form-control"
          type="password"
          value={passwordConfirmation}
          placeholder="password confirmation"
          onChange={handlePasswordConfirmationChange}
        />

        <p className="link">
          Already has Acount ? <Link to="/login">Login</Link>
        </p>

        <button className="btn btn-primary" onClick={handleConfirm}>
          Login
        </button>
      </form>
    </div>
  );
}
