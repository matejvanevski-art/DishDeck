import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/useAuth';
import styles from './Header.module.css';

function Header() {
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  function getNavClass({ isActive }) {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="DishDeck home">
          <span className={styles.brandMark} aria-hidden="true">D</span><span>DishDeck</span>
        </Link>
        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink to="/" end className={getNavClass}>Home</NavLink>
          <NavLink to="/recipes" className={getNavClass}>Browse</NavLink>
          <NavLink to="/favorites" className={getNavClass}>Favorites <span className={styles.count}>{favorites.length}</span></NavLink>
          <NavLink to="/about" className={getNavClass}>About</NavLink>
        </nav>
        <div className={styles.actions}>
          {user ? (
            <><span className={styles.userGreeting}>Hi, {user.name.split(' ')[0]}</span><button className={styles.accountButton} type="button" onClick={logout}>Log out</button></>
          ) : (
            <><Link className={styles.accountButton} to="/login">Log in</Link><Link className={`${styles.accountButton} ${styles.registerButton}`} to="/register">Register</Link></>
          )}
          <button className={styles.themeButton} type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾' : '☀'}</button>
        </div>
      </div>
    </header>
  );
}
export default Header;
