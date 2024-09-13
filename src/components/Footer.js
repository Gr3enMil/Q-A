import styles from "./Components.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerDiv}>
        <p>&copy; {new Date().getFullYear()} Anonymní Poradna. Všechna práva vyhrazena.</p>
      </div>
    </footer>
  );
}