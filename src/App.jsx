import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegionPage from './pages/RegionPage'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('lazzania-theme') || 'dark')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lazzania-favorites') || '[]') } catch { return [] }
  })
  const location = useLocation()
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('lazzania-theme', theme)
  }, [theme])
  useEffect(() => { localStorage.setItem('lazzania-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const onToggleFavorite = id => setFavorites(old => old.includes(id) ? old.filter(x=>x!==id) : [...old,id])
  return <div className="app-shell">
    <Navbar theme={theme} toggleTheme={toggleTheme} favoritesCount={favorites.length}/>
    <Routes>
      <Route path="/" element={<Home favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/north-india" element={<RegionPage region="north" favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/south-india" element={<RegionPage region="south" favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/west-india" element={<RegionPage region="west" favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/east-india" element={<RegionPage region="east" favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/recipe/:id" element={<RecipeDetails favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={onToggleFavorite}/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
  </div>
}
