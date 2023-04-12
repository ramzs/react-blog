import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.mainHeader}>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : '')}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : '')}
          to="/login"
        >
          Login
        </NavLink>
      </nav>
    </header>
  )
}
