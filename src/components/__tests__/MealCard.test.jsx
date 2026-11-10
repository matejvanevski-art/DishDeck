
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MealCard from '../MealCard';
import { FavoritesProvider } from '../../context/FavoritesContext';
import AuthContext from '../../context/AuthContext';

const sampleMeal = {
  id: '52772',
  name: 'Chicken Alfredo',
  category: 'Chicken',
  area: 'Italian',
  image: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
};

function renderMealCard() {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { email: 'test@example.com' } }}>
        <FavoritesProvider>
          <MealCard meal={sampleMeal} />
        </FavoritesProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('MealCard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows the recipe name and category', () => {
    renderMealCard();

    expect(
      screen.getByRole('heading', { name: 'Chicken Alfredo' })
    ).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
  });

  it('saves a recipe to favorites when the heart button is clicked', async () => {
    const user = userEvent.setup();
    renderMealCard();

    const saveButton = screen.getByRole('button', {
      name: 'Save Chicken Alfredo to favorites',
    });

    await user.click(saveButton);

    expect(saveButton).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', {
        name: 'Remove Chicken Alfredo from favorites',
      })
    ).toBeInTheDocument();
  });
});
