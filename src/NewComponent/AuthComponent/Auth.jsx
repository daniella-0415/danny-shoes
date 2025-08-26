import React from 'react';

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isSignUp,
  setIsSignUp,
  handleAuth,
  loading,
}) => {
  return (
    <form onSubmit={handleAuth} className="form">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        required
      />
      {isSignUp && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
        </>
      )}
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button
        type="button"
        className="toggle-button"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;