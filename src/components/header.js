import React from 'react';

const Header = ({ user, currentPage, onNavigate, onShowLogin, onShowSignup, onLogout }) => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => onNavigate('home')}>
            <div className="logo-icon">UC</div>
            <div className="logo-text-container">
              <div className="logo-text">UniCollab</div>
              <div className="logo-by-wise">by WISE</div>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <a 
                  className={currentPage === 'home' ? 'active' : ''}
                  onClick={() => onNavigate('home')}
                >
                  Home
                </a>
              </li>
              {user && (
                <>
                  <li>
                    <a 
                      className={currentPage.includes('dashboard') ? 'active' : ''}
                      onClick={() => onNavigate(`${user.type}-dashboard`)}
                    >
                      Profile
                    </a>
                  </li>
                  <li><a>Projects</a></li>
                  <li><a>Supervisors</a></li>
                </>
              )}
              <li><a>Universities</a></li>
              <li>
                <a 
                  className={currentPage === 'about' ? 'active' : ''}
                  onClick={() => onNavigate('about')}
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button className="btn btn-outline" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={onShowLogin}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={onShowSignup}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;