import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
  setQuery(e.currentTarget.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast('Enter a value to search.', {
        className: styles.toaster
      });
    }
    onSubmit(query);
    setQuery('')
  }

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
    );
  }