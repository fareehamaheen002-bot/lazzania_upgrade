import { Link } from 'react-router-dom'
export default function NotFound(){return <main className="container not-found"><span className="eyebrow">404 • WRONG TURN</span><h1>This page wandered<br/><em>off the menu.</em></h1><Link to="/" className="btn btn-primary">Back to home</Link></main>}
