import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

import QuestionForm from '../components/Questionform.js';
import Questions from '../components/Questions.js';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Anonymní poradna</h1>
        <QuestionForm />
        <Questions />
      </main>
      <Footer />
    </div>
  );
}
