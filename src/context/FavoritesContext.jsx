
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { FAVORITES_STORAGE_KEY } from '../constants/app';
import AuthContext from './AuthContext';

const FavoritesContext = createContext(null);

function readInitialFavorites(storageKey) {
  if (!storageKey) return [];

  try {
    const savedFavorites = window.localStorage.getItem(storageKey);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

const initialState = {
  storageKey: null,
  favorites: [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        storageKey: action.storageKey,
        favorites: action.payload,
      };

    case 'TOGGLE_FAVORITE': {
      const alreadySaved = state.favorites.some(
        (meal) => meal.id === action.payload.id
      );

      return {
        ...state,
        favorites: alreadySaved
          ? state.favorites.filter(
              (meal) => meal.id !== action.payload.id
            )
          : [...state.favorites, action.payload],
      };
    }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (meal) => meal.id !== action.payload
        ),
      };

    case 'CLEAR_FAVORITES':
      return { ...state, favorites: [] };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useContext(AuthContext);

  const storageKey = user?.email
    ? `${FAVORITES_STORAGE_KEY}-${user.email.toLowerCase()}`
    : null;

  const [state, dispatch] = useReducer(
    favoritesReducer,
    initialState
  );

  // Load favorites whenever the logged-in account changes.
  useEffect(() => {
    dispatch({
      type: 'SET_FAVORITES',
      storageKey,
      payload: readInitialFavorites(storageKey),
    });
  }, [storageKey]);

  // Save only after the correct account's favorites have loaded.
  useEffect(() => {
    if (!storageKey || state.storageKey !== storageKey) return;

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(state.favorites)
      );
    } catch {
      // Keep in-memory favorites available if storage is unavailable.
    }
  }, [state.favorites, state.storageKey, storageKey]);

  const toggleFavorite = useCallback((meal) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: meal });
  }, []);

  const removeFavorite = useCallback((mealId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: mealId });
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  }, []);

  const favorites =
    user && state.storageKey === storageKey
      ? state.favorites
      : [];

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favorites, toggleFavorite, removeFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
