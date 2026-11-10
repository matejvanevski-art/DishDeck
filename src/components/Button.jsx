import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
