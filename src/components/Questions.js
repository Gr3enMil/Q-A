'use client';

import styles from "./Components.module.css"

import { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Firebase konfigurace
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Questions() {
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

  return (
    <div className={styles.questionList}>
      <h2>Dotazy a odpovědi</h2>
      {questions.map((q) => (
        <div key={q.id} className={styles.question}>
          <p className={styles.name}><strong>{q.name}</strong> se ptá:</p>
          <p className={styles.ask}>{q.question}</p>

          {q.answer && <p className={styles.answer}><strong>Odpověď:</strong> {q.answer}</p>}

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
