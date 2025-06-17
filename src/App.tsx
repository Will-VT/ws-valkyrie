import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-valkyrie-cream">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </div>
    </Router>
  );
} 