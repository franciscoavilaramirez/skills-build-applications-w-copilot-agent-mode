import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Athletes', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
];

function Overview() {
  return (
    <section className="overview page-section">
      <p className="eyebrow">Octofit Tracker · 2026</p>
      <h1>Move with purpose.</h1>
      <p className="overview-copy">A shared fitness workspace for turning small, consistent efforts into visible progress.</p>
      <div className="overview-links">
        <NavLink className="primary-button" to="/activities">See recent activity</NavLink>
        <NavLink className="text-link" to="/workouts">Find a workout <span aria-hidden="true">↗</span></NavLink>
      </div>
      <div className="overview-rule" />
      <div className="overview-note"><span>01</span><p>Every session counts. Explore the tracker to see how your crew is showing up.</p></div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>octofit</span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}
        </nav>
        <span className="status-dot"><i /> API online</span>
      </header>
      <main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer><span>OCTOFIT TRACKER</span><span>Build consistency, together.</span></footer>
    </div>
  );
}
