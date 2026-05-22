import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getReviews, createReview } from '../../../services/reviewService';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../common/Button/Button';
import styles from './ProductReviews.module.css';

export default function ProductReviews({ slug }) {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    getReviews(slug)
      .then(({ data }) => setReviews(data.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setSubmitting(true);
    setError('');
    try {
      await createReview(slug, form);
      setForm({ rating: 5, comment: '' });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const hasReviewed = reviews.some((r) => r.user?._id === user?._id);

  return (
    <section className={styles.section}>
      <h3>Đánh giá ({reviews.length})</h3>

      {isAuthenticated && !hasReviewed && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Điểm đánh giá
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} sao
                </option>
              ))}
            </select>
          </label>
          <textarea
            placeholder="Chia sẻ trải nghiệm của bạn..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
            rows={3}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" disabled={submitting}>
            Gửi đánh giá
          </Button>
        </form>
      )}

      {loading ? (
        <p>Đang tải đánh giá...</p>
      ) : reviews.length === 0 ? (
        <p className={styles.empty}>Chưa có đánh giá nào.</p>
      ) : (
        <ul className={styles.list}>
          {reviews.map((r) => (
            <li key={r._id} className={styles.item}>
              <div className={styles.head}>
                <strong>{r.user?.name || 'Khách'}</strong>
                <span>{'★'.repeat(r.rating)}</span>
              </div>
              <p>{r.comment}</p>
              <time>{formatDate(r.createdAt)}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
