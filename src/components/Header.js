"use client";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faInfoCircle, faBurger } from '@fortawesome/free-solid-svg-icons';
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Image
          src="/logo.png"  
          alt="Logo"
          width={60}             
          height={60}             
        />
      </div>
      <nav className={menuOpen? styles.headerMenuOpen : styles.headerMenuClosed}>
        <ul className={styles.list}>
          <li><a href="/"><FontAwesomeIcon icon={faHome} /></a></li>
          <li><a href="/faq"><FontAwesomeIcon icon={faQuestionCircle} /></a></li>
          <li><a href="/about"><FontAwesomeIcon icon={faInfoCircle} /></a></li>
        </ul>
        <div>
          <SearchBar onSearch={handleSearch} />
          <QuestionsList questions={filteredQuestions} />
        </div>
      </nav>
      
      
      <FontAwesomeIcon icon={faBurger} className={menuOpen? styles.burgerOpen : styles.burger} onClick={toggleMenu}/>
    </header>
  );
}