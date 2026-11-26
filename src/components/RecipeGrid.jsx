import RecipeCard from './RecipeCard'

export default function RecipeGrid({ items, favorites, onToggleFavorite }) {
  if (!items.length) return <div className="empty-state"><span>🥘</span><h3>No recipes found</h3><p>Try a different search or clear your filters.</p></div>
  return <div className="recipe-grid">{items.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite} />)}</div>
}
