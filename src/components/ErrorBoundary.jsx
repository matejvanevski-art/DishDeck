import { Component } from 'react';
import Button from './Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // This is intentionally an error log for unexpected render failures.
    console.error('DishDeck caught a rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container page-section state-panel error-panel" role="alert">
          <span className="state-icon" aria-hidden="true">!</span>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <Button onClick={() => window.location.assign('/')}>Return to DishDeck</Button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
