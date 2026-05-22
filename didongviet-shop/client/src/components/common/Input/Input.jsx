import styles from './Input.module.css';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className={`${styles.field} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={`${styles.input} ${error ? styles.error : ''}`} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}
