import { Link } from 'react-router-dom'
import { Instagram, Youtube, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-top">
      <div><Link to="/" className="brand footer-brand"><span className="brand-mark">✦</span><span>LAZZANIA<span className="brand-dot">.</span><small>TASTE BEYOND BORDERS</small></span></Link><p>Celebrating India's kitchens, one recipe at a time.</p></div>
      <div className="footer-links"><strong>Explore</strong><Link to="/north-india">North India</Link><Link to="/south-india">South India</Link><Link to="/west-india">West India</Link><Link to="/east-india">East India</Link></div>
      <div className="footer-links"><strong>Discover</strong><Link to="/favorites">Your favourites</Link><a href="/#discover">Find a recipe</a><a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">Recipe API <ArrowUpRight size={13}/></a></div>
      <div className="footer-note"><span className="eyebrow">A LITTLE MORE FLAVOUR</span><h3>Good food brings us together.</h3><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={17}/></a></div></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} LAZZANIA. Made with a love for Indian food.</span><span>Recipes • Regions • Stories</span></div>
  </footer>
}
