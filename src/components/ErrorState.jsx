import Button from './Button';

function ErrorState({ message, onRetry }) {
  return (
    <div className="state-panel error-panel" role="alert">
      <span className="state-icon" aria-hidden="true">!</span>
      <h2>We couldn't load that right now</h2>
      <p>{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}

export default ErrorState;
