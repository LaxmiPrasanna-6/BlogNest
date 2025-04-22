import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from "../../contexts/userAuthorContext"
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import '../common/Home.css'
import { getBaseUrl } from '../../../utils/config'
function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSelectRole(e) {
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('${getBaseUrl()}/author-api/author', currentUser)
        let { message, payload } = res.data;
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        res = await axios.post('${getBaseUrl()}/user-api/user', currentUser)
        let { message, payload } = res.data;
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post('${getBaseUrl()}/admin-api/admin', currentUser)
        let { message, payload } = res.data;
        if (message === 'admin') {
          setCurrentUser({ ...currentUser, ...payload })
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    <div className="animated-background">
      {!isSignedIn ? (
        <div className="welcome-container">
          <h1 className="display-4 mb-4">Share Your Story with the World</h1>
          <p className="lead mb-4">Join our community and start writing your first blog today!</p>
          <button 
            className="get-started-btn"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="role-selection-container">
  <div className="user-info">
    <img 
      src={user.imageUrl} 
      className="profile-image" 
      alt="Profile" 
    />
    <div className="user-details">
      <h2>{user.firstName} {user.lastName}</h2>
      <p className="text-muted">{user.emailAddresses[0].emailAddress}</p>
    </div>
  </div>

  <h3 className="text-center mb-4">Select Your Role</h3>

  {error && <div className="error-message">{error}</div>}

  <div className="role-options">
    <label className="role-option author" onClick={() => document.getElementById('author').click()}>
      <input 
        type="radio" 
        name="role" 
        id="author" 
        value="author" 
        onChange={onSelectRole} 
      />
      Author
    </label>

    <label className="role-option user" onClick={() => document.getElementById('user').click()}>
      <input 
        type="radio" 
        name="role" 
        id="user" 
        value="user" 
        onChange={onSelectRole} 
      />
      User
    </label>

    <label className="role-option admin" onClick={() => document.getElementById('admin').click()}>
      <input 
        type="radio" 
        name="role" 
        id="admin" 
        value="admin" 
        onChange={onSelectRole} 
      />
      Admin
    </label>
  </div>
</div>
      )}
    </div>
  );
}


export default Home ;