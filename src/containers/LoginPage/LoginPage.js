import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export const LoginPage = ({
  setIsLoggedIn,
  setUserName
}) => {

  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);

    setUserName(login);
    setIsLoggedIn(true);
    navigate('/');
  }

  return (
    <h1>
      <form className={styles.loginForm} onSubmit={handleLogIn}>
        <h2>Авторизация</h2>
        <div>
          <input
            className={styles.loginFormInput}
            type="text"
            placeholder="Логин"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <input
            className={styles.loginFormInput}
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">Войти</button>
        </div>
      </form>
    </h1>
  )
}
