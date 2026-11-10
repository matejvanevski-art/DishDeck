import { useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mealApi } from '../api/meals';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import { useFavorites } from '../context/FavoritesContext';
import { useApi } from '../hooks/useApi';
import { normalizeMeal } from '../utils/mealUtils';

function RecipeDetailPage() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();

  const requestRecipe = useCallback(
    ({ signal }) => mealApi.getById(id, { signal }),
    [id]
  );

  const { data, loading, error, refetch } = useApi(requestRecipe);
  const meal = useMemo(() => normalizeMeal(data?.meals?.[0]), [data]);
  const isFavorite = favorites.some((favorite) => favorite.id === id);

  if (loading) {
    return <div className="container page-section"><LoadingState message="Loading recipe details..." /></div>;
  }

  if (error) {
    return <div className="container page-section"><ErrorState message={error} onRetry={refetch} /></div>;
  }

  if (!meal) {
    return (
      <div className="container page-section">
        <EmptyState
          title="Recipe not found"
          message="This recipe may have been removed or the link may be incorrect."
          action={<Link to="/recipes"><Button>Back to recipes</Button></Link>}
        />
      </div>
    );
  }

  return (
    <article className="container recipe-detail page-section">
      <Link className="back-link" to="/recipes">← Back to browse</Link>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img className="detail-image" src={meal.image} alt={`${meal.name} prepared dish`} />
        </div>

        <div className="detail-content">
          <p className="eyebrow">{meal.area} CUISINE · {meal.category}</p>
          <h1>{meal.name}</h1>
          {meal.tags.length > 0 && (
            <div className="tag-list">
              {meal.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          )}
          <p className="detail-intro">
            Get everything ready, follow the instructions, and enjoy your homemade meal.
          </p>
          <Button
            variant={isFavorite ? 'secondary' : 'primary'}
            onClick={() => toggleFavorite({
              id: meal.id,
              name: meal.name,
              category: meal.category,
              area: meal.area,
              image: meal.image,
            })}
            aria-pressed={isFavorite}
          >
            {isFavorite ? '♥ Saved to favorites' : '♡ Save to favorites'}
          </Button>
        </div>
      </div>

      <div className="recipe-information">
        <section className="ingredients-panel">
          <p className="eyebrow">WHAT YOU NEED</p>
          <h2>Ingredients</h2>
          {meal.ingredients.length > 0 ? (
            <ul className="ingredient-list">
              {meal.ingredients.map((ingredient) => (
                <li key={`${ingredient.name}-${ingredient.measure}`}>
                  <span>{ingredient.name}</span>
                  <strong>{ingredient.measure}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>Ingredient information is not available for this recipe.</p>
          )}
        </section>

        <section className="instructions-panel">
          <p className="eyebrow">LET'S GET COOKING</p>
          <h2>Instructions</h2>
          {meal.instructions
            .split(/\r?\n/)
            .map((step) => step.trim())
            .filter(Boolean)
            .map((step, index) => (
              <div className="instruction-step" key={`${index}-${step.slice(0, 18)}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          {meal.youtube && (
            <a className="text-link video-link" href={meal.youtube} target="_blank" rel="noreferrer">
              Watch the recipe video ↗
            </a>
          )}
        </section>
      </div>
    </article>
  );
}

export default RecipeDetailPage;
