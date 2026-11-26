import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Search, Sparkles, Leaf, Flame, ChefHat } from 'lucide-react'
import { regions, recipes, categories } from '../data/recipes'
import RecipeGrid from '../components/RecipeGrid'
import { getIndianMeals, normalizeMeal } from '../services/recipeApi'

export default function Home({ favorites, onToggleFavorite }) {
  const location = useLocation()
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (new URLSearchParams(location.search).get('focusSearch') === '1') {
      document.getElementById('recipe-search')?.focus()
      document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.search])
  const [category, setCategory] = useState('All')
  const [apiRecipes, setApiRecipes] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  useEffect(() => {
    let active = true
    getIndianMeals()
      .then(meals => { if (active) setApiRecipes(meals.map(normalizeMeal)) })
      .catch(() => { if (active) setApiError('Live recipes could not be loaded right now. Please check your internet connection and refresh.') })
      .finally(() => { if (active) setApiLoading(false) })
    return () => { active = false }
  }, [])
  const featured = recipes.slice(0, 8)
  // Keep the live section useful even when the free API has no matching dishes.
  const liveDisplayRecipes = apiRecipes.length ? apiRecipes : recipes.slice(0, 12)
  const filtered = useMemo(() => recipes.filter(r => {
    const matches = `${r.name} ${r.regionLabel} ${r.category}`.toLowerCase().includes(query.toLowerCase())
    return matches && (category === 'All' || r.category === category)
  }), [query, category])
  return <main>
    <section className="hero container">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-line" /> THE INDIAN RECIPE JOURNAL</span>
        <h1>India on a plate.<br/><em>Stories in every bite.</em></h1>
        <p className="hero-desc">From slow-cooked northern classics to the bright, bold flavours of the south — discover the food that brings India home.</p>
        <div className="hero-buttons"><a href="#discover" className="btn btn-primary">Explore recipes <ArrowRight size={17}/></a><a href="#regions" className="btn btn-quiet">Explore regions <span>↓</span></a></div>
        <div className="hero-stats"><div><strong>04</strong><span>REGIONS</span></div><i/><div><strong>32+</strong><span>HANDPICKED RECIPES</span></div><i/><div><strong>∞</strong><span>WAYS TO ENJOY</span></div></div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo"><img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=90" alt="A delicious Indian thali spread" /></div>
        <div className="hero-photo-label"><span>01 / THE COLLECTION</span><strong>A feast of<br/>regional India</strong></div>
        <div className="hero-stamp"><span>MADE WITH</span><strong>♥</strong><span>MASALA</span></div>
      </div>
    </section>
    <section className="ticker"><div className="ticker-track"><span>THE ART OF INDIAN COOKING ✳</span><span>FOUR REGIONS, ONE TABLE ✳</span><span>RECIPES WORTH SHARING ✳</span><span>THE ART OF INDIAN COOKING ✳</span><span>FOUR REGIONS, ONE TABLE ✳</span></div></section>
    <section className="section container" id="regions">
      <div className="section-heading"><div><span className="eyebrow">A COUNTRY OF MANY FLAVOURS</span><h2>Explore by <em>region.</em></h2></div><p>Every corner of India has a kitchen story. Pick a region and let the flavours lead the way.</p></div>
      <div className="region-grid">{regions.map((region, index) => <Link to={`/${region.id}-india`} className="region-card" key={region.id}><img src={region.image} alt={region.name}/><span className="region-number">0{index+1}</span><div className="region-overlay"><span>{region.count}</span><h3>{region.name}</h3><p>{region.subtitle}</p><b><ArrowRight size={19}/></b></div></Link>)}</div>
    </section>
    <section className="section section-soft" id="discover"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">FRESH FROM THE KITCHEN</span><h2>Find your next <em>favourite.</em></h2></div><Link to="/south-india" className="text-link">Explore all recipes <ArrowRight size={16}/></Link></div>
      <div className="search-filter-row"><label className="search-box"><Search size={19}/><input id="recipe-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes, regions or flavours..." /><kbd>⌕</kbd></label><div className="category-pills">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c}</button>)}</div></div>
      <RecipeGrid items={query || category !== 'All' ? filtered : featured} favorites={favorites} onToggleFavorite={onToggleFavorite}/>
      {(query || category !== 'All') && <button className="btn btn-quiet clear-filter" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button>}
    </div></section>
    <section className="section container" id="live-recipes">
      <div className="section-heading"><div><span className="eyebrow">POWERED BY THEMEALDB</span><h2>More from the <em>recipe world.</em></h2></div><p>Fresh Indian cuisine results loaded live from a free recipe API.</p></div>
      {apiLoading ? <div className="empty-state"><span>🍲</span><h3>Loading recipe discoveries...</h3><p>Connecting to TheMealDB.</p></div> : <><RecipeGrid items={liveDisplayRecipes} favorites={favorites} onToggleFavorite={onToggleFavorite}/>{apiError && <p className="api-note">Live results are temporarily unavailable, so popular recipes from the LAZZANIA collection are shown instead.</p>}</>}
      <p className="api-attribution">Live recipe data, when available, is provided by <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a>. Regional North, South, West and East collections above are curated separately.</p>
    </section>
    <section className="quote-section container"><div className="quote-mark">“</div><div><span className="eyebrow">MORE THAN A MEAL</span><h2>Every recipe carries<br/><em>a little piece of home.</em></h2><p>Cook something familiar. Discover something new. Pass the plate around.</p></div><div className="quote-icon"><ChefHat size={42}/><span>COOK • SHARE • REPEAT</span></div></section>
    <section className="feature-strip container"><div><Sparkles/><strong>Curated regional picks</strong><span>Explore dishes from across India.</span></div><div><Leaf/><strong>Veg-friendly discovery</strong><span>Find a dish for every table.</span></div><div><Flame/><strong>Made for food lovers</strong><span>Simple steps, big flavours.</span></div></section>
  </main>
}
