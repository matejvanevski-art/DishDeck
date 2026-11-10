import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import MealList from '../components/MealList';
import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className="section container page-section">
      <div className="section-heading">
        <div className="page-heading">
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>Saved recipes</h1>
          <p>Your favourite meals, all in one place.</p>
        </div>
        {favorites.length > 0 && (
          <Button variant="secondary" onClick={clearFavorites}>
            Clear favorites
          </Button>
        )}
      </div>

      {favorites.length > 0 ? (
        <MealList meals={favorites} />
      ) : (
        <EmptyState
          title="Your collection is empty"
          message="Save recipes with the heart button and they will appear here."
          action={<Link to="/recipes"><Button>Find recipes</Button></Link>}
        />
      )}
    </section>
  );
}

export default FavoritesPage;
