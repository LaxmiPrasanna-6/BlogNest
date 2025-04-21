import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/userAuthorContext';
import './Header.css';
import logo from "../../assets/logo.jpg";
function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    navigate('/');
  }

  return (
    <header className="header-container">
      <nav className="header navbar navbar-expand-lg navbar-light bg-light p-3">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Blog Logo"
              className="logo-img"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    Signin
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <div className="signed-in-section">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-outline-danger signout-btn"
                  >
                    Sign Out
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;