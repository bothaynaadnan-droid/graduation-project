import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import StudentDashboard from './pages/StudentDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import About from './pages/About';
import StudentProfile from './pages/StudentProfile';
import ProjectsPage from './pages/Projectspage';
import ChatPage from './pages/ChatPage';
import NotesCalendarPage from './pages/NotesCalendarPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
    setCurrentPage(userData.type === 'student' ? 'student-dashboard' : 'supervisor-dashboard');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setShowSignupModal(false);
    setCurrentPage(userData.type === 'student' ? 'student-dashboard' : 'supervisor-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'student-dashboard':
        return <StudentProfile user={user} onLogout={handleLogout} />;
      case 'supervisor-dashboard':
        return <SupervisorDashboard user={user} onLogout={handleLogout} />;
      case 'about':
        return <About />;
      default:
        return (
          <Home 
            onShowLogin={() => setShowLoginModal(true)}
            onShowSignup={() => setShowSignupModal(true)}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header 
            user={user}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onShowLogin={() => setShowLoginModal(true)}
            onShowSignup={() => setShowSignupModal(true)}
            onLogout={handleLogout}
          />
          
          {/* Routes for navigation */}
          <Routes>
            <Route 
              path="/" 
              element={renderPage()}
            />
            <Route 
              path="/student" 
              element={<StudentProfile user={user} onLogout={handleLogout} />}
            />
            <Route 
              path="/projects" 
              element={<ProjectsPage />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/supervisor" 
              element={<SupervisorDashboard user={user} onLogout={handleLogout} />} 
            />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/notes-calendar" element={<NotesCalendarPage />} />
          </Routes>
          
          {showLoginModal && (
            <LoginModal 
              onClose={() => setShowLoginModal(false)}
              onLogin={handleLogin}
              onSwitchToSignup={() => {
                setShowLoginModal(false);
                setShowSignupModal(true);
              }}
            />
          )}
          
          {showSignupModal && (
            <SignupModal 
              onClose={() => setShowSignupModal(false)}
              onSignup={handleSignup}
              onSwitchToLogin={() => {
                setShowSignupModal(false);
                setShowLoginModal(true);
              }}
            />
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;