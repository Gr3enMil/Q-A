"use client"

import styles from "./Components.module.css"

import { useState } from 'react';
import { db } from '../../firebase'; // Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

export default function QuestionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [question, setQuestion] = useState('');
  const [warn, setWarn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaToken = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      { action: 'submit' }
    );

    if (isAnonymous) {
      if (!email || !question) {
        setWarn(true);
        return;
      } else {
        setWarn(false);
        await sendAnonymousEmail(recaptchaToken);
      }
    } else {
      if (!name || !question) {
        setWarn(true);
        return;
      } else {
        setWarn(false);      
        await submitQuestion(recaptchaToken);
      }
    }

    setName('');
    setEmail('');
    setQuestion('');
    setIsAnonymous(false);
  };

  const sendAnonymousEmail = async (recaptchaToken) => {
    try {
      const response = await fetch('/api/questions/anonym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, question, recaptchaToken }),
      });
      if (!response.ok) {
        alert('Failed to send anonymous question');
      }
    } catch (err) {
      console.error('Error sending anonymous email:', err);
    }
  };

  const submitQuestion = async (recaptchaToken) => {
    try {
      await addDoc(collection(db, 'questions'), {
        name,
        question,
        recaptchaToken,
      });
      
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  return (
    <section className={styles.formContainer}>
      <h2>Dotazový formulář:</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.first}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Anonymní dotaz
        </label>
        {!isAnonymous && (
          <>
            <label htmlFor="name" className={styles.second}>Jméno: </label>
            <input
              className={styles.labelInput}
              id="name"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        {isAnonymous && (
          <>
            <label htmlFor="email" className={styles.second}>Email: </label>
            <input
              className={styles.labelInput}
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}


        <label htmlFor="question" className={styles.second}>Dotaz: </label>
        <textarea
          className={styles.labelInput}
          id="question"
          placeholder=""
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <p className={styles.warn}>{warn && 'Vyplňte všechna pole!'}</p>

        <button type="submit" className={styles.button}>Odeslat</button>
      </form>
    </section>
  );
}
