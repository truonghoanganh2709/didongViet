import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Tìm iPhone, Samsung, Xiaomi..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        Tìm kiếm
      </button>
    </form>
  );
}
