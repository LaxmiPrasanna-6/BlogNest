// About.js
import React from 'react';
import { 
  FaPenAlt, 
  FaUsers, 
  FaRocket, 
  FaShieldAlt, 
  FaComments 
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">
          About BlogApp
        </h1>
        <p className="lead text-muted">
          Where Ideas Meet Readers - Your Platform for Meaningful Content Sharing
        </p>
      </div>

      {/* Mission Statement */}
      <div className="row mb-5 g-4">
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4">
              <h2 className="h3 text-success mb-3">Our Mission</h2>
              <p className="text-muted mb-0">
                At BlogApp, we empower writers and readers to connect through meaningful content. 
                Our platform is designed to foster creativity, knowledge sharing, and constructive 
                discussions in a secure and user-friendly environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="row g-4 mb-5">
        <h2 className="text-center h2 mb-4 text-primary">Why Choose BlogApp?</h2>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <FaPenAlt className="text-success mb-3" size={40} />
              <h5 className="h5">Intuitive Writing</h5>
              <p className="text-muted small">
                Rich text editor with markdown support and real-time preview
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <FaUsers className="text-info mb-3" size={40} />
              <h5 className="h5">Community Driven</h5>
              <p className="text-muted small">
                Engage with readers through comments and reactions
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <FaShieldAlt className="text-warning mb-3" size={40} />
              <h5 className="h5">Secure Platform</h5>
              <p className="text-muted small">
                Enterprise-grade security with regular backups and encryption
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <FaRocket className="text-danger mb-3" size={40} />
              <h5 className="h5">Fast Performance</h5>
              <p className="text-muted small">
                Optimized loading speeds with CDN-powered content delivery
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <FaComments className="text-primary mb-3" size={40} />
              <h5 className="h5">Interactive Discussions</h5>
              <p className="text-muted small">
                Threaded comments with moderation tools and spam protection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-4 bg-light rounded-3">
        <h3 className="h4 mb-3">Ready to Join Our Community?</h3>
        <a href="/signup" className="btn btn-primary btn-lg px-5">
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default About;