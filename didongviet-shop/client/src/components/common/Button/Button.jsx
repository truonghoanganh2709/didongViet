import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const variantClass = variant === 'outline' ? styles.outline : styles.primary;
  return (
    <button type={type} className={`${styles.btn} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
