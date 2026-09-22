import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';
import CollectionState from './CollectionState';

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(activitiesApiUrl)
      .then((data) => setActivities(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Movement log</p>
        <h1>Recent activities</h1>
        <p>Track the work that keeps your teams moving forward.</p>
      </div>
      <CollectionState loading={state.loading} error={state.error} empty={!activities.length}>
        <div className="record-grid">
          {activities.map((activity) => (
            <article className="record-card" key={activity._id || activity.id}>
              <span className="record-kicker">{activity.type}</span>
              <h2>{activity.user?.name || activity.user?.username || 'Athlete'}</h2>
              <p>{activity.durationMinutes} minutes completed</p>
              <strong>{activity.points} points</strong>
            </article>
          ))}
        </div>
      </CollectionState>
    </section>
  );
}
