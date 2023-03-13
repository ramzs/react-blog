import './Header.css';

export const Header = () => {
  return (
    <header>
      <nav>
        <a href="#first" className="active">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}
