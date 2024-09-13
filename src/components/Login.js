"use client"

import styles from "./Components.module.css"

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // Uložíme token do localStorage
      localStorage.setItem('authToken', token);

      // Přesměrujeme na hlavní stránku
      router.push('/');
    } catch (error) {
      setError('Přihlášení selhalo. Zkontrolujte své přihlašovací údaje.');
    }
  };

  return (
    <div> 
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Přihlásit se</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
