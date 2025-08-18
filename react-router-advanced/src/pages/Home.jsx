import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p><Link to="/profile/details">Go to Profile Details (Protected)</Link></p>
      <p><Link to="/blog/123">Go to Blog Post 123</Link></p>
    </div>
  );
}
