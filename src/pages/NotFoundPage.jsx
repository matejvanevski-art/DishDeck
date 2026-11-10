import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <section className="container page-section not-found">
      <p className="eyebrow">404 · WRONG TURN</p>
      <h1>This page isn't on the menu.</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/"><Button>Back to home</Button></Link>
    </section>
  );
}

export default NotFoundPage;
