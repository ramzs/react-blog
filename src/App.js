import './App.css';
import { Header } from './components/Header/Header';
import { BlogPage } from './containers/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';

export function App() {
  return (
    <Router>
      <div className="App">

        <Header />

        <main>
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
