import styles from "./about.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function About() {

  return (
    <>
      <div className={styles.aboutHead}>
        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faHome} /></a>
        <h1>Kdo jsme?</h1>
        <a href="/faq" className={styles.icon}><FontAwesomeIcon icon={faQuestionCircle} /></a>
      </div>
      <div className={styles.about}>

        <div className={styles.aboutContent}>
          <p>Jsme skupina jednotlivců, která se rozhodla vytvořit tento web pro
            všechny, kteří hledají odpovědi na své otázky, ale z různých důvodů
            nechtějí odhalovat svou identitu. </p>
          <p>Naším cílem je poskytnout bezpečný a anonymní prostor, kde můžete
            svobodně položit jakýkoli dotaz a získat odpověď bez jakéhokoli
            hodnocení nebo předsudků.</p>
          <h2 id="duvod-existence-webu">Proč tento web existuje?</h2>
          <p>Tento web vznikl z potřeby umožnit lidem klást otázky, na které
            možná nemají odvahu se ptát veřejně nebo osobně. Věříme, že každý
            má právo na odpovědi, a proto jsme vytvořili platformu, kde můžete
            zůstat zcela anonymní, a přitom získat potřebné informace.</p>
          <p>Nepotřebujeme vaše jméno, e-mail, ani žádné další osobní údaje.
            Chceme, abyste se cítili pohodlně a mohli se ptát na cokoli, co vás
            zajímá.</p>
        </div>
      </div>
    </>
  );
}