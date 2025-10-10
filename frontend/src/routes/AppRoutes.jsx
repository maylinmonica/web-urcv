import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from '../pages/welcomepage/Welcome.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;