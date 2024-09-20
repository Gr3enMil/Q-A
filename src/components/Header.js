"use client";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from "./Components.module.css";
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import QuestionsList from './QuestionsList';
import { db } from '../../firebase'; // Firebase konfigurace
import { collection, getDocs } from 'firebase/firestore';


export default function Header() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsData);
      setFilteredQuestions([]); // Načteme všechny dotazy jako výchozí stav
    };

    fetchQuestions();
  }, []);

  const handleSearch = (term) => {
    if (term) {
      const filtered = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(term) ||
          (q.answer && q.answer.toLowerCase().includes(term))
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  };

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
      <nav className={styles.headerNav}>
        <ul className={styles.list}>
          <li><a href="/"><FontAwesomeIcon icon={faHome} /></a></li>
          <li><a href="/faq"><FontAwesomeIcon icon={faQuestionCircle} /></a></li>
          <li><a href="/about"><FontAwesomeIcon icon={faInfoCircle} /></a></li>
        </ul>
      </nav>
      <div>
        <SearchBar onSearch={handleSearch} />
        <QuestionsList questions={filteredQuestions} />
      </div>
    </header>
  );
}