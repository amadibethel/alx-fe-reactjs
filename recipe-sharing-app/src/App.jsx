import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RecipeDetails from './RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
