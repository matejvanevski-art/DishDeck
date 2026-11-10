function EmptyState({
  title = 'Nothing here yet',
  message = 'Try another search or explore a different category.',
  action = null,
}) {
  return (
    <div className="state-panel empty-panel">
      <span className="state-icon" aria-hidden="true">⌕</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}

export default EmptyState;
