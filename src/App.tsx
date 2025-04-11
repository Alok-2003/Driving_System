import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import UserForm from './pages/UserForm';
import DriverDetailsPage from './pages/DriverScore';
import VehicleTracking from './pages/VehicleTracking';
import LocationTracker from './pages/LocationTracker';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page rendered without layout */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="vehicle-tracking" element={<VehicleTracking />} />
          {/* You can add additional dashboard routes here */}
          <Route path="form" element={<UserForm />} />
          <Route path="driver-score" element={<DriverDetailsPage />} />
          <Route path="test" element={<LocationTracker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
