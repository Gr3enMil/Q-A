import Image from 'next/image';
import styles from "./Components.module.css";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Image
          src="/logo.png"  // Cesta k logu
          alt="Logo"
          width={60}             // Šířka obrázku
          height={60}             // Výška obrázku
        />
      </div>
      <div></div>
    </header>
  );
}