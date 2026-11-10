import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Button from './Button';
import styles from './MealCard.module.css';

function MealCard({ meal }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === meal.id);

  return (
    <article className={styles.card}>
      <Link
        to={`/recipes/${meal.id}`}
        className={styles.recipeLink}
        aria-label={`View ${meal.name} recipe`}
      >
        <div className={styles.imageWrap}>
          <img
            className={styles.image}
            src={meal.image}
            alt={`${meal.name} recipe`}
            loading="lazy"
          />
          <span className={styles.category}>{meal.category || 'Recipe'}</span>
        </div>

        <div className={styles.content}>
          <h3>{meal.name}</h3>
          <p>{meal.area || 'Explore this recipe'}</p>
        </div>
      </Link>

      <div className={styles.actions}>
        <Link className={styles.detailsLink} to={`/recipes/${meal.id}`}>
          View recipe <span aria-hidden="true">→</span>
        </Link>
        <Button
          variant="icon"
          className={styles.favoriteButton}
          onClick={() => toggleFavorite(meal)}
          aria-label={
            isFavorite
              ? `Remove ${meal.name} from favorites`
              : `Save ${meal.name} to favorites`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </Button>
      </div>
    </article>
  );
}

export default memo(MealCard);
