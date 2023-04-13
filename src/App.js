import './App.css';
import { useState } from 'react'
import { Header } from './components/Header/Header';
import { BlogPage } from './containers/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';

export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  return (
    <Router>
      <div className="App">

        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/blog" replace /> : <Navigate to="/login" replace />} />
            <Route path="/login"
              element={
                !isLoggedIn ?
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                  : <Navigate to="/blog" replace />
              }
            />
            <Route path="/blog" element={isLoggedIn ? <BlogPage /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
