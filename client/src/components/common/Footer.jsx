import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          

          {/* Quick Links */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/blogs" className="text-white text-decoration-none">Blogs</a></li>
              <li><a href="/create-post" className="text-white text-decoration-none">Write</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li >contact@blogapp.com</li>
              <li >+1 (555) 123-4567</li>
              <li >123 Blog Street</li>
              <li >Digital City, DC 54321</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-12">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white social-link">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white social-link">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white social-link">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white social-link">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top pt-3 text-center">
          <p className="mb-0 ">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .social-link {
          transition: all 0.3s ease;
        }
        .social-link:hover {
          color: #ffc107 !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}

export default Footer;