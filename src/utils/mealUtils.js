export function normalizeMeal(meal, defaults = {}) {
  if (!meal) {
    return null;
  }

  const ingredients = [];

  for (let index = 1; index <= 20; index += 1) {
    const name = meal[`strIngredient${index}`]?.trim();
    const measure = meal[`strMeasure${index}`]?.trim();

    if (name) {
      ingredients.push({ name, measure: measure || '' });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || defaults.category || 'Recipe',
    area: meal.strArea || defaults.area || 'International',
    image: meal.strMealThumb,
    instructions: meal.strInstructions || '',
    ingredients,
    tags: meal.strTags
      ? meal.strTags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [],
    youtube: meal.strYoutube || '',
    source: meal.strSource || '',
  };
}

export function normalizeMeals(meals, defaults = {}) {
  return (meals || []).map((meal) => normalizeMeal(meal, defaults)).filter(Boolean);
}
