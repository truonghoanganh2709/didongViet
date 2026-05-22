import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useWishlist } from '../../../hooks/useWishlist';
import { addToCompare, isInCompare, COMPARE_MAX } from '../../../utils/compareStorage';
import { ROUTES } from '../../../constants/routes';
import styles from './ProductActions.module.css';

export default function ProductActions({ product, compact = false }) {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggle } = useWishlist();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const inWishlist = isInWishlist(product._id);
  const inCompare = isInCompare(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    try {
      await toggle(product._id);
      setMsg(inWishlist ? 'Đã bỏ yêu thích' : 'Đã thêm yêu thích');
      setTimeout(() => setMsg(''), 2000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      setMsg('Đã có trong so sánh');
      return;
    }
    const list = addToCompare(product);
    setMsg(`Đã thêm (${list.length}/${COMPARE_MAX})`);
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <div className={`${styles.actions} ${compact ? styles.compact : ''}`}>
      <button
        type="button"
        className={`${styles.btn} ${inWishlist ? styles.active : ''}`}
        onClick={handleWishlist}
        title="Yêu thích"
      >
        {inWishlist ? '♥' : '♡'}
      </button>
      <button type="button" className={styles.btn} onClick={handleCompare} title="So sánh">
        ⚖
      </button>
      {msg && <span className={styles.msg}>{msg}</span>}
    </div>
  );
}
