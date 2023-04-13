import { NavLink } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import styles from './Header.module.css';

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {

  const handleLogOut = () => {
    localStorage.setItem('isLoggedin', false);
    setIsLoggedIn(false);
  }

  return (
    <header className={styles.mainHeader}>
      {
        isLoggedIn ?
          <nav>
            Добро пожаловать,&nbsp;<strong>{userName}</strong>
            <NavLink
              onClick={handleLogOut}
              to="/login"
            >
              <MeetingRoomIcon />
              Выйти
            </NavLink>
          </nav>
          : 'Добро пожаловать!'
      }
    </header>
  )
}
