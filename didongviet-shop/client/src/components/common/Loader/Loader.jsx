import styles from './Loader.module.css';

export default function Loader({ text = 'Đang tải...' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
      <p>{text}</p>
    </div>
  );
}
