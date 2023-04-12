import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export const LoginPage = () => {

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
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
            required
          />
        </div>
        <div>
          <input
            className={styles.loginFormInput}
            type="password"
            placeholder="Пароль"
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
