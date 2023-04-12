import styles from './Footer.module.css';

export const Footer = ({ year }) => {
  return (
    <footer className={styles.mainFooter}>
      <span>&copy;React Blog - {year}</span>
    </footer>
  )
}
