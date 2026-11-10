
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { RECENT_SEARCHES_STORAGE_KEY } from '../constants/app';
import { mealApi } from '../api/meals';
import Button from './Button';
import styles from './SearchBar.module.css';

function SearchBar({ initialValue = '', onSearch, placeholder = 'Search by recipe name...' }) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage(RECENT_SEARCHES_STORAGE_KEY, []);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 1) {
      return undefined;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      setSuggestionLoading(true);
      setSuggestionError('');

      try {
        const response = await mealApi.search(trimmedQuery, {
          signal: controller.signal,
        });

        setSuggestions((response?.meals || []).slice(0, 6));
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSuggestions([]);
          setSuggestionError(
            'Suggestions are temporarily unavailable. You can still submit your search.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setSuggestionLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleQueryChange(event) {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setSuggestionError('');
      setSuggestionLoading(false);
    }
  }

  function rememberSearch(value) {
    setRecentSearches((current) =>
      [
        value,
        ...current.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        ),
      ].slice(0, 5)
    );
  }

  function submitSearch(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    rememberSearch(trimmedQuery);
    setIsFocused(false);
    onSearch(trimmedQuery);
  }

  function chooseSuggestion(meal) {
    const value = meal.strMeal;
    setQuery(value);
    rememberSearch(value);
    setSuggestions([]);
    setIsFocused(false);
    onSearch(value);
  }

  function selectRecentSearch(search) {
    setQuery(search);
    setIsFocused(false);
    onSearch(search);
  }

  const showSuggestions = isFocused && query.trim().length > 0;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form className={styles.form} role="search" onSubmit={submitSearch}>
        <label className="sr-only" htmlFor="recipe-search">
          Search recipes
        </label>

        <input
          id="recipe-search"
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={handleQueryChange}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="recipe-suggestions"
        />

        <Button type="submit">Search recipes</Button>
      </form>

      {showSuggestions && (
        <div
          className={styles.suggestions}
          id="recipe-suggestions"
          role="listbox"
          aria-label="Recipe suggestions"
        >
          {suggestionLoading && (
            <p className={styles.suggestionMessage}>Searching recipes...</p>
          )}

          {!suggestionLoading && suggestionError && (
            <p className={styles.suggestionMessage}>{suggestionError}</p>
          )}

          {!suggestionLoading &&
            !suggestionError &&
            suggestions.map((meal) => (
              <button
                className={styles.suggestion}
                key={meal.idMeal}
                type="button"
                role="option"
                onClick={() => chooseSuggestion(meal)}
              >
                <img src={meal.strMealThumb} alt="" loading="lazy" />
                <span>{meal.strMeal}</span>
                <span className={styles.suggestionArrow} aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}

          {!suggestionLoading &&
            !suggestionError &&
            suggestions.length === 0 && (
              <p className={styles.suggestionMessage}>
                No matching recipes yet. Try another search.
              </p>
            )}
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className={styles.recent} aria-label="Recent searches">
          <span>Recent:</span>

          {recentSearches.map((search) => (
            <button
              className={styles.recentButton}
              key={search}
              type="button"
              onClick={() => selectRecentSearch(search)}
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
