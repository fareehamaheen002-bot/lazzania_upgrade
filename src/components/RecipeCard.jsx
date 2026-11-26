import { Heart, Clock3, Star, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FoodImage from './FoodImage'

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-image-wrap">
        <FoodImage name={recipe.name} image={recipe.image} />
        <span className="recipe-region">{recipe.regionLabel}</span>
      </Link>
      <button className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(recipe.id)} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <div className="recipe-card-body">
        <div className="recipe-meta"><span><Clock3 size={14} /> {recipe.time} min</span><span><Star size={14} fill="currentColor" /> {recipe.rating}</span></div>
        <Link to={`/recipe/${recipe.id}`} className="recipe-title">{recipe.name}</Link>
        <p>{recipe.intro}</p>
        <div className="card-bottom"><span className="food-type"><i className={recipe.type === 'Vegetarian' ? 'veg-dot' : 'nonveg-dot'} />{recipe.type}</span><Link to={`/recipe/${recipe.id}`} className="card-arrow" aria-label={`View ${recipe.name}`}><ArrowUpRight size={18} /></Link></div>
      </div>
    </article>
  )
}
