'use client';

import styles from "./Components.module.css"

import { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Firebase konfigurace
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Questions({ question, initialVotes }) {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null); // Uchovává ID dotazu, na který odpovídáme
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Získáme token z localStorage
    const token = localStorage.getItem('authToken');

    // Pokud je token přítomen, uživatel je považován za přihlášeného
    if (token) {
      setIsLoggedIn(true);
    }

    // Načítání dotazů z Firestore
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  // Funkce pro mazání dotazů
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Funkce pro uložení odpovědi
  const handleAnswerSubmit = async (id) => {
    await updateDoc(doc(db, 'questions', id), {
      answer: answer, // Uložíme odpověď
    });
    setEditingId(null); // Zavřeme textarea
    setAnswer(''); // Vyčistíme textarea
  };

  // Přidána funkce pro hlasování
  const handleUpvote = async (q) => {
    const voteKey = `hasVoted_${q.id}`; // Unikátní klíč pro každou otázku

    // Zkontrolujeme, zda už uživatel hlasoval
    if (localStorage.getItem(voteKey)) {
      /*alert("Už jste hlasoval pro tuto odpověď.");*/
      return;
    }

    const newVotes = (q.votes || 0) + 1;
    await updateDoc(doc(db, 'questions', q.id), {
      votes: newVotes,
    });
    setQuestions(questions.map(question => 
      question.id === q.id ? { ...question, votes: newVotes } : question
    ));

    // Uložíme informaci, že už uživatel hlasoval
    localStorage.setItem(voteKey, 'true');
  };

  return (
    <div className={styles.questionList}>
      <h2>Dotazy a odpovědi</h2>
      {questions.map((q) => (
        <div key={q.id} className={styles.question}>
          <p className={styles.name}>
          <i className="fas fa-question-circle"></i> <strong>{q.name}</strong> se ptá:</p>
          <p className={styles.ask}>{q.question}</p>

          {q.answer && (
            <div className={styles.answerSection}>
              <p className={styles.answer}><i className="fas fa-reply"></i> <strong>Odpověď:</strong></p>
              <p className={styles.answer}> {q.answer}</p>
              
              {/* Zobrazení hlasování */}
              <div className={styles.voteSection}>
                <button onClick={() => handleUpvote(q)}>+</button>
                <span>{q.votes || 0}</span>
              </div>
            </div>
          )} 

          {isLoggedIn && (
            <div>
              {/* Křížek pro mazání dotazů */}
              <button onClick={() => handleDelete(q.id)}>❌ Smazat dotaz</button>

              {/* Kolečko pro odpověď */}
              <button onClick={() => setEditingId(q.id)}>⭕ Odpovědět</button>

              {/* Zobrazení textarea pro odpověď */}
              {editingId === q.id && (
                <div>
                  <textarea
                    placeholder="Zadejte odpověď"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button onClick={() => handleAnswerSubmit(q.id)}>Odeslat odpověď</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
