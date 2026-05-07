import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TripList />} />
          <Route path="/trip/:id" element={<TripDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
