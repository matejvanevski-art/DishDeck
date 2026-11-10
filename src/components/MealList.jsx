import MealCard from './MealCard';

function MealList({ meals }) {
  return (
    <div className="meal-grid" aria-label="Recipe results">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;
