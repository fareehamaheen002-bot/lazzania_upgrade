import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react'
import { regions, recipes, categories } from '../data/recipes'
import RecipeGrid from '../components/RecipeGrid'

const titles = { north:'North India', south:'South India', west:'West India', east:'East India' }

export default function RegionPage({ region, favorites, onToggleFavorite }) {
  const info = regions.find(r => r.id === region)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [category, setCategory] = useState('All')
  const items = useMemo(() => recipes.filter(r => r.region === region && `${r.name} ${r.category}`.toLowerCase().includes(query.toLowerCase()) && (type === 'All' || r.type === type) && (category === 'All' || r.category === category)), [region, query, type, category])
  if (!info) return <main className="container not-found"><h1>Region not found</h1><Link to="/">Back home</Link></main>
  return <main>
    <section className={`region-hero region-hero-${region}`}><img src={info.image} alt={info.name}/><div className="region-hero-shade"/><div className="container region-hero-content"><Link to="/" className="back-link"><ArrowLeft size={15}/> Back to all regions</Link><span className="eyebrow">THE LAZZANIA REGIONAL COLLECTION</span><h1>{titles[region]}<br/><em>on your table.</em></h1><p>{info.description}</p><span className="region-count">{info.count} <i/> {info.subtitle}</span></div></section>
    <section className="section container region-listing">
      <div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Recipes from <em>{titles[region].split(' ')[0]}.</em></h2></div><p>{items.length} recipes to explore. Find a classic, or meet a new favourite.</p></div>
      <div className="search-filter-row region-filters"><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${titles[region]} recipes...`}/></label><div className="select-filters"><label><SlidersHorizontal size={16}/><select value={type} onChange={e=>setType(e.target.value)}><option>All</option><option>Vegetarian</option><option>Non-Vegetarian</option></select></label><label><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label></div></div>
      <RecipeGrid items={items} favorites={favorites} onToggleFavorite={onToggleFavorite}/>
    </section>
    <section className="region-next container"><span className="eyebrow">KEEP EXPLORING</span><div>{regions.filter(r=>r.id!==region).map(r=><Link to={`/${r.id}-india`} key={r.id}>{r.name}<ArrowLeft size={15}/></Link>)}</div></section>
  </main>
}
