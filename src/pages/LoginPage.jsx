import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from '../components/Button';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try { login({ email: email.trim(), password }); navigate('/'); }
    catch (loginError) { setError(loginError.message); }
  }

  return <section className="section container page-section auth-page">
    <div className="auth-card">
      <p className="eyebrow">WELCOME BACK</p><h1>Log in to DishDeck</h1>
      <p className="auth-description">Use your demo account to continue.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" />
        <label htmlFor="login-password">Password</label>
        <div className="password-field"><input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Your password" /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button></div>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <Button type="submit">Log in</Button>
      </form>
      <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
      <p className="auth-demo-note">Demo mode: account details are saved only in this browser. Do not use a real password.</p>
    </div>
  </section>;
}
export default LoginPage;
