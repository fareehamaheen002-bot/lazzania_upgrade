import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Heart, Search, ChefHat } from 'lucide-react'

export default function Navbar({ theme, toggleTheme, favoritesCount }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark"><ChefHat size={20} /></span>
          <span>LAZZANIA<span className="brand-dot">.</span><small>TASTE BEYOND BORDERS</small></span>
        </Link>
        <button className="mobile-menu icon-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
          <NavLink to="/" onClick={close}>Home</NavLink>
          <a href="/#regions" onClick={close}>Regions</a>
          <NavLink to="/north-india" onClick={close}>North</NavLink>
          <NavLink to="/south-india" onClick={close}>South</NavLink>
          <NavLink to="/west-india" onClick={close}>West</NavLink>
          <NavLink to="/east-india" onClick={close}>East</NavLink>
          <NavLink to="/favorites" className="nav-fav" onClick={close}><Heart size={16} /> Saved <span>{favoritesCount}</span></NavLink>
        </nav>
        <div className="nav-actions">
          <button type="button" className="icon-btn search-nav" aria-label="Search recipes" onClick={() => { close(); navigate('/?focusSearch=1#discover') }}><Search size={18} /></button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
