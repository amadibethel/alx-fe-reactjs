import { Outlet, Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav style={{ marginBottom: 12 }}>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>
      {/* Nested route outlet */}
      <Outlet />
    </div>
  );
}
