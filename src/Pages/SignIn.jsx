import React, { useState } from 'react';
import "./SignIn.css";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = isSignUp ? '/signup' : '/signin';
    const payload = isSignUp
      ? { email, password, firstName, lastName }
      : { email, password };

    try {
      const response = await fetch(`http://API_BASE_URL:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage(data.message);
        if (!isSignUp) {
          setUser({ id: data.userId, email: data.email, firstName: data.firstName });
          setEmail('');
          setPassword('');
        } else {
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setIsSignUp(false);
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="signin-wrapper">
  <div className="signin-card">
    <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
    <form onSubmit={handleAuth}>
      {isSignUp && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
    <button className="switch-btn" onClick={() => setIsSignUp(!isSignUp)}>
      Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
    </button>
    {message && <p className="error-message">{message}</p>}
    {user && (
      <div className="user-info">
        <p>Welcome, {user.firstName} ({user.email})</p>
        <button onClick={() => setUser(null)}>Sign Out</button>
      </div>
    )}
  </div>
</div>

  )}
export default SignIn;