import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mealApi } from "../api/meals";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import MealList from "../components/MealList";
import SearchBar from "../components/SearchBar";
import { useApi } from "../hooks/useApi";
import { normalizeMeals } from "../utils/mealUtils";

const INSPIRATIONS = [
  {
    query: "chicken",
    title: "Chicken favourites",
    eyebrow: "A LITTLE INSPIRATION",
  },
  { query: "pasta", title: "Pasta nights", eyebrow: "COMFORT FOOD" },
  { query: "seafood", title: "Fresh from the sea", eyebrow: "SOMETHING FRESH" },
  { query: "beef", title: "Hearty beef dishes", eyebrow: "BIG FLAVOURS" },
  {
    query: "vegetarian",
    title: "Plant-powered plates",
    eyebrow: "FRESH IDEAS",
  },
  {
    query: "dessert",
    title: "Save room for dessert",
    eyebrow: "SWEET INSPIRATION",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [inspirationIndex, setInspirationIndex] = useState(0);
  const [displayedMeals, setDisplayedMeals] = useState([]);

  const inspiration = INSPIRATIONS[inspirationIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setInspirationIndex((current) => (current + 1) % INSPIRATIONS.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, []);

  const requestFeaturedMeals = useCallback(
    ({ signal }) => mealApi.search(inspiration.query, { signal }),
    [inspiration.query],
  );

  const { data, loading, error, refetch } = useApi(requestFeaturedMeals);

  const meals = useMemo(() => normalizeMeals(data?.meals), [data]);

  // Keep the previous recipes visible while the next category loads.
  useEffect(() => {
    if (!loading && !error) {
      setDisplayedMeals(meals.slice(0, 6));
    }
  }, [loading, error, meals]);

  const handleSearch = useCallback(
    (query) => navigate(`/search?q=${encodeURIComponent(query)}`),
    [navigate],
  );

  const mealsKey = displayedMeals.map((meal) => meal.id).join("-");

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <p className="eyebrow">GOOD FOOD, GOOD MOOD</p>
          <h1>
            Find your next <span>favourite</span> meal.
          </h1>
          <p className="hero-copy">
            Explore recipes from around the world, discover new flavours, and
            keep the ones you love in one place.
          </p>
          <SearchBar onSearch={handleSearch} />
          <div className="hero-links">
            <Link to="/recipes">Browse all categories</Link>
            <span aria-hidden="true">·</span>
            <Link to="/favorites">See your saved recipes</Link>
          </div>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <span>✳</span>
          <span>✦</span>
          <span>✳</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading inspiration-heading" aria-live="polite">
          <div key={inspiration.query} className="inspiration-copy">
            <p className="eyebrow">{inspiration.eyebrow}</p>
            <h2>{inspiration.title}</h2>
            <p>Fresh ideas for whatever you feel like eating.</p>
          </div>
          <Link className="text-link" to="/recipes">
            Explore categories →
          </Link>
        </div>

        {loading && displayedMeals.length === 0 && (
          <LoadingState message={`Finding ${inspiration.query} recipes...`} />
        )}

        {error && displayedMeals.length === 0 && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {displayedMeals.length > 0 && (
          <>
            {loading && (
              <p className="inspiration-status" role="status">
                Finding more inspiration...
              </p>
            )}
            <div key={mealsKey} className="inspiration-meals">
              <MealList meals={displayedMeals} />
            </div>
            {error && (
              <p className="inspiration-status" role="status">
                Couldn't refresh the recipes. Showing the previous suggestions.
              </p>
            )}
          </>
        )}

        {!loading && !error && displayedMeals.length === 0 && (
          <EmptyState title="No featured recipes found" />
        )}
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          <div>
            <span>01</span>
            <h3>Discover</h3>
            <p>Find inspiration for your next meal.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Explore</h3>
            <p>Browse recipes by category and cuisine.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Save</h3>
            <p>Keep your favourites close at hand.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
