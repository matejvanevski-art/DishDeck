import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from '../components/Button';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must contain at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    register({ name: name.trim(), email: email.trim(), password });
    navigate('/');
  }

  return <section className="section container page-section auth-page">
    <div className="auth-card">
      <p className="eyebrow">JOIN THE TABLE</p><h1>Create your account</h1>
      <p className="auth-description">Create a demo profile to try DishDeck.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">Name</label>
        <input id="register-name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" placeholder="Your name" />
        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" />
        <label htmlFor="register-password">Password</label>
        <div className="password-field"><input id="register-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" placeholder="At least 6 characters" /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button></div>
        <label htmlFor="register-confirm">Confirm password</label>
        <input id="register-confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required autoComplete="new-password" placeholder="Repeat your password" />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <Button type="submit">Create account</Button>
      </form>
      <p className="auth-switch">Already registered? <Link to="/login">Log in</Link></p>
      <p className="auth-demo-note">Demo mode only: details are stored locally in this browser, not on a secure server. Do not use a real password.</p>
    </div>
  </section>;
}
export default RegisterPage;
