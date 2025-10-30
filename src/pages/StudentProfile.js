import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import { 
  FaProjectDiagram, FaPlus, FaUsers, FaEnvelope, FaUserTie, 
  FaChartLine, FaComment, FaCalendarAlt, FaStickyNote, FaCog,
  FaEdit, FaTimes, FaStar, FaArrowLeft
} from 'react-icons/fa';
import './StudentProfile.css';



const StudentProfile = ({ user, onLogout }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(user?.profilePic || '');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'my-projects'
  const { currentThemeConfig } = useTheme();

  // Character options
  const characterOptions = [
    { id: 1, emoji: '👦' , category: 'male' },
    { id: 2, emoji: '👧',  category: 'female' },
    { id: 3, emoji: '👨‍🎓',  category: 'male' },
    { id: 4, emoji: '👩‍🎓',  category: 'female' },
    { id: 5, emoji: '🧑‍💻',  category: 'male' },
    { id: 6, emoji: '👩‍💻',  category: 'female' },
    { id: 7, emoji: '🧑‍🏫',  category: 'male' },
    { id: 8, emoji: '👩‍🏫',  category: 'female' }
  ];

  // Sample projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Learning Assistant",
      status: "In Progress",
      rating: 4.5,
      teamMembers: 3,
      supervisor: "Dr. Somaya",
      progress: 65,
      description: "An AI-powered tool that provides personalized learning recommendations and study plans for students.",
      skills: ["Python", "TensorFlow", "NLP", "Machine Learning"],
      field: "AI"
    },
    {
      id: 2,
      title: "Blockchain Voting System",
      status: "Planning",
      rating: 3,
      teamMembers: 2,
      supervisor: "Dr. Malek",
      progress: 20,
      description: "A secure voting system using blockchain technology for transparent and tamper-proof elections.",
      skills: ["Blockchain", "Solidity", "Web3", "React"],
      field: "IT"
    }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Research phase completion", dueDate: "2024-12-15", completed: false },
    { id: 2, title: "Submit progress report", dueDate: "2024-12-20", completed: false },
    { id: 3, title: "Team meeting with supervisor", dueDate: "2024-12-18", completed: true }
  ]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character.emoji);
    setIsEditing(false);
  };

  const dashboardOptions = [
        {
            id: 1,
            title: 'My Projects',
            icon: <FaProjectDiagram />,
            description: 'View and manage your ongoing projects',
            onClick: () => setCurrentView('my-projects')
        },
        {
            id: 2,
            title: 'Create Project',
            icon: <FaPlus />,
            description: 'Start a new project and share your idea',
            onClick: () => navigate('/projects')
        },
        {
            id: 3,
            title: 'Find Team',
            icon: <FaUsers />,
            description: 'Find team members for your projects',
            onClick: () => navigate('/find-team')
        },
        {
      id: 4,
      title: 'Messages',
      icon: <FaEnvelope />,
      description: 'Communicate with your team and supervisors',
      onClick: () => alert('Navigate to Messages page')
    },
    {
      id: 5,
      title: 'Supervisors',
      icon: <FaUserTie />,
      description: 'Connect with academic supervisors',
      onClick: () => alert('Navigate to Supervisors page')
    },
    {
      id: 6,
      title: 'Progress',
      icon: <FaChartLine />,
      description: 'Track your academic progress and feedback',
      onClick: () => alert('Navigate to Progress page')
    }
  ];

  // Theme Settings Component
  const ThemeSettings = () => {
    const {
      isDarkMode,
      currentTheme,
      themes,
      toggleDarkMode,
      changeTheme
    } = useTheme();

    return (
      <div className="theme-settings-tab">
        <h3>Theme Settings</h3>
        <div className="setting-item">
          <label className="setting-label">
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={toggleDarkMode} 
              className="setting-checkbox"
            />
            <span className="setting-text">Dark Mode</span>
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-label">Select Theme Color:</label>
          <select 
            value={currentTheme} 
            onChange={(e) => changeTheme(e.target.value)}
            className="theme-select"
          >
            {Object.keys(themes).map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="theme-preview">
          <h4>Current Theme Preview:</h4>
          <div className="preview-colors">
            <div 
              className="color-swatch primary" 
              style={{ backgroundColor: currentThemeConfig.primary }}
            >
              Primary
            </div>
            <div 
              className="color-swatch secondary" 
              style={{ backgroundColor: currentThemeConfig.secondary }}
            >
              Secondary
            </div>
            <div 
              className="color-swatch accent" 
              style={{ backgroundColor: currentThemeConfig.accent }}
            >
              Accent
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simple click handlers for tabs
  const handleChatClick = (chatId) => {
    console.log(`Opening chat: ${chatId}`);
    alert(`Would open chat: ${chatId}`);
  };

  const handleMissionClick = (missionId) => {
    console.log(`Opening mission: ${missionId}`);
    alert(`Would open mission: ${missionId}`);
  };

  const handleTodoClick = (todoId) => {
    console.log(`Opening todo: ${todoId}`);
    alert(`Would open todo: ${todoId}`);
  };

  const handleProjectClick = (projectId) => {
    console.log(`Opening project: ${projectId}`);
    alert(`Would open project details for: ${projectId}`);
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      
      case 'settings':
        return (
          <div className="tab-content">
            <h3><FaCog /> Settings</h3>
            <div className="settings-section">
              <ThemeSettings />
              
              <div className="setting-group">
                <h4>Account Settings</h4>
                <div className="setting-item">
                  <button className="setting-btn" onClick={() => setIsEditing(true)}>
                    <FaEdit /> Edit Profile & Avatar
                  </button>
                </div>
                <div className="setting-item">
                  <button className="setting-btn">Notification Preferences</button>
                </div>
                <div className="setting-item">
                  <button className="setting-btn">Privacy Settings</button>
                </div>
              </div>
              
              <div className="setting-group">
                <h4>App Settings</h4>
                <div className="setting-item">
                  <button className="setting-btn">Language & Region</button>
                </div>
                <div className="setting-item">
                  <button className="setting-btn">Help & Support</button>
                </div>
                <div className="setting-item">
                  <button className="setting-btn logout-btn" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i}
        className={i < Math.floor(rating) ? 'star filled' : 'star'}
      />
    ));
  };

  // My Projects View
  const renderMyProjectsView = () => {
    return (
      <div className="my-projects-view">
        <div className="container">
          {/* Back Button */}
          <button 
            className="back-to-dashboard-btn"
            onClick={() => setCurrentView('dashboard')}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>

          {/* Page Header */}
          <div className="page-header">
            <h1>My Current Projects</h1>
            <p>Manage and track your ongoing projects</p>
          </div>

          {/* Projects Grid */}
          <div className="projects-detailed-grid">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="project-detailed-card clickable"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-details">
                  <div className="detail-item">
                    <span className="label">Field:</span>
                    <span className="value">{project.field}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Supervisor:</span>
                    <span className="value">{project.supervisor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Skills:</span>
                    <div className="skills-list">
                      {project.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-metrics">
                  <div className="metric">
                    <FaUsers className="metric-icon" />
                    <span>{project.teamMembers} members</span>
                  </div>
                  <div className="metric">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span>{project.progress}% complete</span>
                  </div>
                  <div className="metric">
                    <div className="rating-stars">
                      {renderStars(project.rating)}
                      <span>({project.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="project-actions">
                  <button className="btn manage-btn">
                    Manage Project
                  </button>
                  <button className="btn view-btn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
      
          <div className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/projects'}
              >
                <FaPlus /> Create New Project
              </button>
              <button className="btn btn-outline">
                <FaUsers /> Find Team Members
              </button>
              <button className="btn btn-outline">
                <FaChartLine /> View Progress Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard View
  const renderDashboardView = () => {
    return (
      <>
        {/* Dashboard Options */}
        <div className="dashboard-section">
          <div className="container">
            <div className="section-title">
              <h2>Student Dashboard</h2>
              <p>Welcome back, {user?.name || 'Student'}! Manage your projects and collaborations.</p>
            </div>
            
            <div className="dashboard-grid">
              {dashboardOptions.map(option => (
                <div key={option.id} className="dashboard-card clickable" onClick={option.onClick}>
                  <div className="card-icon">{option.icon}</div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <button 
                    className="card-action-btn"
                    style={{ backgroundColor: currentThemeConfig.primary }}
                    onClick={option.onClick}
                  >
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        {/* Tab Content Area */}
        <div className="tab-content-area">
          <div className="container">
            {renderTabContent()}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="student-profile">
      {/* Profile Header */}
      <div 
        className="profile-header"
        style={{ 
          background: `linear-gradient(135deg, ${currentThemeConfig.primary} 0%, ${currentThemeConfig.primaryDark} 100%)` 
        }}
      >
        <div className="container">
          <div className="profile-main">
            <div className="profile-pic-container">
              <div className="profile-pic-large">
                {selectedCharacter || '👤'}
              </div>
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit /> Change Avatar
              </button>
            </div>
            
            <div className="profile-info">
              <h1 className="student-name">{user?.name || 'Student Name'}</h1>
              <p className="student-email">{user?.email || 'student@university.edu'}</p>
              <p className="student-university">WISE University</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{projects.length}</span>
                  <span className="stat-label">Active Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {projects.reduce((total, project) => total + project.teamMembers, 0)}
                  </span>
                  <span className="stat-label">Team Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {(projects.reduce((total, project) => total + project.rating, 0) / projects.length).toFixed(1)}
                  </span>
                  <span className="stat-label">
                    <FaStar className="star filled" /> Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Selection Modal */}
      {isEditing && (
        <div className="character-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Choose Your Avatar</h3>
              <button 
                className="close-modal"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="character-grid">
              {characterOptions.map(character => (
                <div
                  key={character.id}
                  className={`character-option ${
                    selectedCharacter === character.emoji ? 'selected' : ''
                  }`}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="character-emoji">{character.emoji}</div>
                  <span className="character-label">{character.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Switch between views */}
      {currentView === 'my-projects' ? renderMyProjectsView() : renderDashboardView()}

      {/* Bottom Navigation Bar */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default StudentProfile;