// src/components/Header.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ user, onLogout }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Link to="/dashboard" className="site-name">
          <img src="/logo.png" alt="Rootopia Logo" className="logo" />
          Rootopia
        </Link>
      </div>
      
      <nav className="header-nav">
        <Link to="/tutorials" className="nav-link">Tutorials</Link>
        <Link to="/articles" className="nav-link">Articles</Link>
        <Link to="/forum" className="nav-link">Forum</Link>
        
        <div className="dropdown-container">
          <button className="nav-link dropdown-toggle">
            Catalog <span className="dropdown-caret">▼</span>
          </button>
          <div className="dropdown-menu">
            <Link to="/catalog/plants" className="dropdown-item">Plants</Link>
            <Link to="/catalog/tools" className="dropdown-item">Tools</Link>
          </div>
        </div>
        
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>
        
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
        
        <Link to="/profile" className="profile-link">
          <img 
            src={user?.avatar || "https://via.placeholder.com/100"} 
            alt="Profile" 
            className="profile-thumb" 
          />
        </Link>
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Header;