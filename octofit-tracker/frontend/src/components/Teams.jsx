import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';
import CollectionState from './CollectionState';

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(teamsApiUrl)
      .then(setTeams)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><p className="eyebrow">Collective energy</p><h1>Teams</h1><p>Find your people and keep the momentum visible.</p></div>
      <CollectionState loading={state.loading} error={state.error} empty={!teams.length}>
        <div className="record-grid">{teams.map((team) => <article className="record-card" key={team._id || team.id}><span className="record-kicker">{team.members?.length || 0} members</span><h2>{team.name}</h2><p>Shared progress across every workout.</p><strong>{team.points} points</strong></article>)}</div>
      </CollectionState>
    </section>
  );
}
