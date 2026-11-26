import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { recipes } from '../data/recipes'
import RecipeGrid from '../components/RecipeGrid'

export default function Favorites({ favorites, onToggleFavorite }) {
  const saved = recipes.filter(r=>favorites.includes(r.id))
  return <main className="container favorites-page section"><span className="eyebrow">YOUR PERSONAL COLLECTION</span><h1>Saved with <em>love.</em></h1><p className="page-lead">The recipes you want to come back to, all in one place.</p>
    {saved.length ? <RecipeGrid items={saved} favorites={favorites} onToggleFavorite={onToggleFavorite}/> : <div className="empty-favorites"><div><Heart size={30}/></div><h2>Your recipe box is waiting.</h2><p>Tap the heart on any recipe to save it here for later.</p><Link to="/" className="btn btn-primary">Discover recipes <ArrowRight size={16}/></Link></div>}
  </main>
}
