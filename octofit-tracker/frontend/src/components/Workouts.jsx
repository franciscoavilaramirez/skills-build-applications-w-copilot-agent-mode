import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';
import CollectionState from './CollectionState';

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(workoutsApiUrl)
      .then(setWorkouts)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><p className="eyebrow">Personalized plans</p><h1>Workouts</h1><p>Choose a session that meets you where you are today.</p></div>
      <CollectionState loading={state.loading} error={state.error} empty={!workouts.length}>
        <div className="record-grid">{workouts.map((workout) => <article className="record-card" key={workout._id || workout.id}><span className="record-kicker">{workout.type} · {workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.exercises?.join(' · ')}</p><strong>{workout.durationMinutes} minutes</strong></article>)}</div>
      </CollectionState>
    </section>
  );
}
