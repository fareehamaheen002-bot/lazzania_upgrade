import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, Heart, ChefHat, PlayCircle, CheckCircle2 } from 'lucide-react'
import { recipes } from '../data/recipes'
import { getMealDetails, normalizeMeal } from '../services/recipeApi'
import FoodImage from '../components/FoodImage'

export default function RecipeDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams()
  const local = recipes.find(r => r.id === id)
  const [recipe, setRecipe] = useState(local || null)
  const [loading, setLoading] = useState(!local && id.startsWith('api-'))
  const [checked, setChecked] = useState([])
  useEffect(() => {
    let active = true
    if (!local && id.startsWith('api-')) {
      getMealDetails(id.replace('api-', '')).then(meal => { if (active && meal) setRecipe(normalizeMeal(meal)) }).catch(()=>{}).finally(()=>{ if(active) setLoading(false) })
    } else setRecipe(local || null)
    return () => { active = false }
  }, [id])
  if (loading) return <main className="container loading-state">Loading your recipe...</main>
  if (!recipe) return <main className="container not-found"><h1>Recipe not found</h1><Link to="/">Return home</Link></main>
  const favorite = favorites.includes(recipe.id)
  return <main className="recipe-detail-page">
    <div className="container detail-breadcrumb"><Link to="/"><ArrowLeft size={16}/> Back to discovery</Link><span>{recipe.regionLabel} / {recipe.category}</span></div>
    <section className="container detail-hero">
      <div className="detail-image"><FoodImage name={recipe.name} image={recipe.image} detail /><span className="detail-image-tag">A LAZZANIA FAVOURITE</span></div>
      <div className="detail-intro"><span className="eyebrow">{recipe.regionLabel.toUpperCase()} • {recipe.category.toUpperCase()}</span><h1>{recipe.name}</h1><p>{recipe.intro}</p><div className="detail-stats"><span><Clock3/>{recipe.time} min</span><span><ChefHat/>{recipe.difficulty}</span><span className="food-type"><i className={recipe.type==='Vegetarian'?'veg-dot':'nonveg-dot'}/>{recipe.type}</span></div><button className={`btn ${favorite?'btn-saved':'btn-primary'}`} onClick={()=>onToggleFavorite(recipe.id)}><Heart size={17} fill={favorite?'currentColor':'none'}/>{favorite?'Saved to favourites':'Save this recipe'}</button></div>
    </section>
    <section className="container detail-content">
      <div className="ingredients-panel"><span className="eyebrow">GET YOUR KITCHEN READY</span><h2>What you'll <em>need.</em></h2><p className="muted">Tick off ingredients as you get them ready.</p><div className="ingredient-list">{recipe.ingredients.map((item,i)=><label key={i} className={checked.includes(i)?'ingredient-checked':''}><input type="checkbox" checked={checked.includes(i)} onChange={()=>setChecked(old=>old.includes(i)?old.filter(x=>x!==i):[...old,i])}/><span>{item}</span></label>)}</div></div>
      <div className="method-panel"><span className="eyebrow">LET'S MAKE IT</span><h2>Step by <em>step.</em></h2><div className="steps-list">{recipe.steps.map((step,i)=><div className="step-item" key={i}><span className="step-number">{String(i+1).padStart(2,'0')}</span><p>{step}</p></div>)}</div>{recipe.youtube && <a className="btn btn-quiet video-link" href={recipe.youtube} target="_blank" rel="noreferrer"><PlayCircle size={18}/> Watch cooking video</a>}</div>
    </section>
    <section className="container detail-tip"><CheckCircle2/><p><strong>Lazzania tip</strong> — Taste as you go, adjust the seasoning to your liking, and make this recipe your own.</p></section>
  </main>
}
