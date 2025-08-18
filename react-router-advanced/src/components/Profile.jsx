import { Routes, Route, Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav style={{ marginBottom: 12 }}>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes defined here */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
