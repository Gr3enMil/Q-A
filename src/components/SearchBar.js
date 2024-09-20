'use client';

import { useState } from 'react';
import styles from './Components.module.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term); // Předáme vyhledávací dotaz rodičovské komponentě
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Vyhledat v dotazech..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
}
