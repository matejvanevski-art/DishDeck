import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mealApi } from '../api/meals';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MealList from '../components/MealList';
import SearchBar from '../components/SearchBar';
import { useApi } from '../hooks/useApi';
import { normalizeMeals } from '../utils/mealUtils';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const requestSearch = useCallback(
    ({ signal }) => (
      query
        ? mealApi.search(query, { signal })
        : Promise.resolve({ meals: [] })
    ),
    [query]
  );

  const { data, loading, error, refetch } = useApi(requestSearch);
  const meals = useMemo(() => normalizeMeals(data?.meals), [data]);

  const handleSearch = useCallback(
    (nextQuery) => setSearchParams({ q: nextQuery }),
    [setSearchParams]
  );

  return (
    <section className="section container page-section">
      <div className="page-heading">
        <p className="eyebrow">FIND YOUR CRAVING</p>
        <h1>Search recipes</h1>
        <p>Search by recipe name and discover something new.</p>
      </div>

      <SearchBar key={query} initialValue={query} onSearch={handleSearch} />

      {!query && (
        <EmptyState
          title="What would you like to cook?"
          message="Enter an ingredient or recipe name in the search field."
          action={<Link className="button-link" to="/recipes">Browse categories</Link>}
        />
      )}

      {query && (
        <>
          <div className="section-heading compact-heading">
            <div>
              <h2>Results for “{query}”</h2>
              <p>{meals.length} recipes found</p>
            </div>
          </div>
          {loading && <LoadingState message={`Searching for ${query}...`} />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {!loading && !error && meals.length > 0 && <MealList meals={meals} />}
          {!loading && !error && meals.length === 0 && (
            <EmptyState
              title="No matching recipes"
              message="Try a different spelling or search for another ingredient."
            />
          )}
        </>
      )}
    </section>
  );
}

export default SearchPage;
