import React, { useState, useEffect, useRef } from 'react';
import './features.css';

const Features = () => {  // Component name must be uppercase
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const featuresRef = useRef(null);

  const features = [
    {
      icon: '👥',
      title: 'User Management',
      description: 'Create profiles for students and supervisors with role-based access and university affiliations.',
      shape: 'user-shape'
    },
    {
      icon: '💡',
      title: 'Project & Idea Management',
      description: 'Share project ideas, form teams, and manage your collaborative projects across institutions.',
      shape: 'idea-shape'
    },
    {
      icon: '👨‍🏫',
      title: 'Supervision & Feedback',
      description: 'Receive academic guidance and feedback from supervisors across multiple universities.',
      shape: 'supervision-shape'
    },
    {
      icon: '⭐',
      title: 'Evaluation & Rating',
      description: 'Rate projects and team members with our 5-star system to foster positive competition.',
      shape: 'rating-shape'
    },
    {
      icon: '💬',
      title: 'Communication & Notifications',
      description: 'Stay connected with real-time messaging, notifications, and collaborative tools.',
      shape: 'communication-shape'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add features one by one with delay
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, [features.length]);

  return (
    <section className="features" id="features" ref={featuresRef}>
      <div className="container">
        <div className="section-title">
          <h2>Platform Features</h2>
          <p>UniCollab provides all the tools you need for successful project collaboration and academic supervision</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${visibleFeatures.includes(index) ? 'visible' : ''} ${feature.shape}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="feature-shape">
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;