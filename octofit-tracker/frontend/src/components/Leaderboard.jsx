import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';
import CollectionState from './CollectionState';

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(leaderboardApiUrl)
      .then(setEntries)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><p className="eyebrow">The standings</p><h1>Leaderboard</h1><p>Small wins add up. See who is setting the pace.</p></div>
      <CollectionState loading={state.loading} error={state.error} empty={!entries.length}>
        <div className="leaderboard-list">
          {entries.map((entry, index) => <div className="leaderboard-row" key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><span><strong>{entry.user?.name || entry.user?.username || 'Athlete'}</strong><small>{entry.team?.name || 'Independent'}</small></span><b>{entry.points} pts</b></div>)}
        </div>
      </CollectionState>
    </section>
  );
}
