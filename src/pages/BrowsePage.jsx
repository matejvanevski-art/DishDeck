import { useCallback, useMemo, useState } from 'react';
import { mealApi } from '../api/meals';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MealList from '../components/MealList';
import { useApi } from '../hooks/useApi';
import { normalizeMeals } from '../utils/mealUtils';

function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('Chicken');

  const requestCategories = useCallback(
    ({ signal }) => mealApi.getCategories({ signal }),
    []
  );
  const {
    data: categoryData,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useApi(requestCategories);

  const requestRecipes = useCallback(
    ({ signal }) => mealApi.filterByCategory(selectedCategory, { signal }),
    [selectedCategory]
  );
  const {
    data: recipeData,
    loading: recipesLoading,
    error: recipesError,
    refetch: refetchRecipes,
  } = useApi(requestRecipes);

  const categories = categoryData?.categories || [];
  const meals = useMemo(() => normalizeMeals(recipeData?.meals, { category: selectedCategory }), [recipeData, selectedCategory]);

  return (
    <section className="section container page-section">
      <div className="page-heading">
        <p className="eyebrow">EXPLORE THE MENU</p>
        <h1>Browse recipes</h1>
        <p>Choose a category and find something worth cooking.</p>
      </div>

      <div className="filter-row">
        <label htmlFor="category-filter">Recipe category</label>
        {categoriesLoading ? (
          <span className="muted-text">Loading categories...</span>
        ) : categoriesError ? (
          <button className="inline-button" type="button" onClick={refetchCategories}>
            Couldn't load categories. Try again.
          </button>
        ) : (
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="section-heading compact-heading">
        <div>
          <h2>{selectedCategory} recipes</h2>
          <p>Fresh ideas selected from TheMealDB.</p>
        </div>
      </div>

      {recipesLoading && <LoadingState message={`Loading ${selectedCategory.toLowerCase()} recipes...`} />}
      {recipesError && <ErrorState message={recipesError} onRetry={refetchRecipes} />}
      {!recipesLoading && !recipesError && meals.length > 0 && <MealList meals={meals} />}
      {!recipesLoading && !recipesError && meals.length === 0 && (
        <EmptyState title="No recipes in this category" />
      )}
    </section>
  );
}

export default BrowsePage;
