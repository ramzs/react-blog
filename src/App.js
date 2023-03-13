import './App.css';
import { Header } from './components/Header/Header';
import { BlogPage } from './components/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';

export function App() {
  return (
    <div className="App">

      <Header />

      <main>
        <BlogPage />
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
