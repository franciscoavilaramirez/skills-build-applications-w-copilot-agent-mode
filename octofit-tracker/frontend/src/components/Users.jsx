import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';
import CollectionState from './CollectionState';

const usersApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(usersApiUrl)
      .then(setUsers)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><p className="eyebrow">Your crew</p><h1>Athletes</h1><p>Meet the people building a healthier rhythm together.</p></div>
      <CollectionState loading={state.loading} error={state.error} empty={!users.length}>
        <div className="record-grid">{users.map((user) => <article className="record-card user-card" key={user._id || user.id}><img src={user.avatar || 'https://i.pravatar.cc/150?img=1'} alt="" /><div><span className="record-kicker">@{user.username}</span><h2>{user.name}</h2><p>{user.email}</p></div></article>)}</div>
      </CollectionState>
    </section>
  );
}
