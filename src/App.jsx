// import PharmacyFinder from './components/pharmacyFinder.jsx';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PharmacyFinder />
//     </div>
//   )
// }

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PharmacyFinder from './components/pharmacyFinder.jsx';
import AdminHome from './Admin.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<PharmacyFinder />} />
          <Route path="/add-medication" element={<AdminHome />} />
        </Routes>
      </div>
    </Router>
  );
}