import './App.css';
import { useState } from 'react'
import { Header } from './components/Header/Header';
import { BlogPage } from './containers/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { NotFound } from './containers/NotFound/NotFound';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { BlogItemPage } from './containers/BlogPage/components/BlogItemPage';

export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userName') === 'admin');

  return (
    <BrowserRouter>
      <div className="App">

        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
        />

        <main>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/blog" replace /> : <Navigate to="/login" replace />} />

            <Route path="/login"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                    setIsAdmin={setIsAdmin}
                  />
                </PublicRoute>
              }
            />

            <Route path="/blog/:postId"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <BlogItemPage isAdmin={isAdmin} />
                </PrivateRoute>
              }
            />

            <Route path="/blog"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <BlogPage isAdmin={isAdmin} />
                </PrivateRoute>
              }
            />

            {/* <Route path="/login"
              element={
                !isLoggedIn ?
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                  : <Navigate to="/blog" replace />
              }
            /> */}
            {/* <Route path="/blog" element={isLoggedIn ? <BlogPage /> : <Navigate to="/login" replace />} /> */}

            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate to="/404" state={window.location.pathname} />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
