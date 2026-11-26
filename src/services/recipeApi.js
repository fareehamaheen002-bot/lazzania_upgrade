const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(query) {
  const response = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error('Recipe search is temporarily unavailable.')
  const data = await response.json()
  return data.meals || []
}

export async function getIndianMeals() {
  // TheMealDB's area filter may return null for "Indian". Search known
  // Indian dishes individually instead, then combine and de-duplicate results.
  const dishQueries = [
    'Butter Chicken', 'Biryani', 'Chicken Tikka Masala', 'Dal',
    'Samosa', 'Korma', 'Tandoori Chicken', 'Chana Masala',
    'Palak Paneer', 'Vindaloo', 'Rogan Josh', 'Dosa'
  ]
  const results = await Promise.allSettled(
    dishQueries.map(query => searchMeals(query))
  )
  const unique = new Map()
  results.forEach(result => {
    if (result.status !== 'fulfilled') return
    result.value.forEach(meal => unique.set(meal.idMeal, meal))
  })
  return [...unique.values()]
}

export async function getMealDetails(id) {
  const response = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`)
  if (!response.ok) throw new Error('Could not load recipe details.')
  const data = await response.json()
  return data.meals?.[0] || null
}

export function normalizeMeal(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim()
    if (ingredient) ingredients.push(`${ingredient}${measure ? ` — ${measure}` : ''}`)
  }
  return {
    id: `api-${meal.idMeal}`,
    apiId: meal.idMeal,
    name: meal.strMeal,
    region: 'south',
    regionLabel: meal.strArea || 'Indian',
    category: meal.strCategory || 'Indian Recipe',
    type: /chicken|mutton|beef|pork|fish|prawn|shrimp|meat|egg/i.test(`${meal.strMeal} ${ingredients.join(' ')}`) ? 'Non-Vegetarian' : 'Vegetarian',
    time: 40,
    difficulty: 'Easy',
    rating: 4.7,
    image: meal.strMealThumb,
    intro: `A delicious ${meal.strArea || 'Indian'} recipe to add to your cooking list.`,
    ingredients,
    steps: (meal.strInstructions || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean),
    source: meal.strSource,
    youtube: meal.strYoutube,
  }
}
