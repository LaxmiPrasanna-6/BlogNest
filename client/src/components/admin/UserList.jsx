import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"
import { adminContextObj } from "../../contexts/AdminContext";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { currentAdmin, setCurrentAdmin } = useContext(adminContextObj);

  // Fixed 1: Add null check for admin context
  if (!adminContextObj) {
    return <p className="text-danger">Admin context not found</p>;
  }

  async function toggleDisableEnable(userObj) {
    try {
      const updatedUser = { ...userObj, isActive: !userObj.isActive };
      const res = await axios.put(`http://localhost:3000/admin-api/user/${userObj._id}`, updatedUser);

      if (res.data.message === "updated") {
        // Fixed 2: Proper state update
        setUsers(prevUsers => prevUsers.map(user => 
          user._id === userObj._id ? updatedUser : user
        ));

        // Fixed 3: Add conditional for admin update
        if (currentAdmin?._id === userObj._id) {
          setCurrentAdmin(prev => ({ ...prev, ...updatedUser }));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Update failed. Please try again.");
    }
  }

  async function getUsers() {
    try {
      const res = await axios.get("http://localhost:3000/admin-api/users");
      console.log("API response:", res);
      console.log("html res:", res.data);
  
      // Ensure the response has the correct structure before setting users
      if (res.data?.message === "users") {
        setUsers(res.data.payload || []);  // Set users data
        setError("");  // Clear any previous errors
      } else {
        setError(res.data?.message || "Failed to load users");  // Set error message
        setUsers([]);  // Ensure users is an empty array in case of failure
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch users");
      setUsers([]);  // Reset to empty array on error
    }
    console.log(users)
  }
  

  useEffect(() => {
    getUsers();
    console.log("testing users: ",users)
  }, []);

  return (
    <div className="container">
      {error && <p className="text-danger text-center mt-3">{error}</p>}
  
      {/* Active Users Section */}
      <div className="mb-5">
        <h3 className="text-success mb-4">🌟 Active Users ({users.filter(u => u?.isActive).length})</h3>
        <div className="row g-3">
          {users.filter(u => u?.isActive).length > 0 ? (
            users.map(user => user?.isActive && (
              <div className="col-md-6" key={user._id}>
                <div className="user-hover-effect d-flex align-items-center p-3 bg-light rounded">
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.firstName} ${user.lastName || ''}`}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{user.firstName} {user.lastName}</h5>
                    <p className="mb-1 text-muted">{user.role}</p>
                    <small className="text-success">{user.email}</small>
                  </div>
                  <button 
                    onClick={() => toggleDisableEnable(user)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Disable
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No active users found</p>
          )}
        </div>
      </div>
  
      {/* Inactive Users Section */}
      <div className="mb-4">
        <h3 className="text-secondary mb-4">💤 Inactive Users ({users.filter(u => !u?.isActive).length})</h3>
        <div className="row g-3">
          {users.filter(u => !u?.isActive).length > 0 ? (
            users.map(user => !user?.isActive && (
              <div className="col-md-6" key={user._id}>
                <div className="user-hover-effect d-flex align-items-center p-3 bg-light rounded opacity-75">
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.firstName} ${user.lastName || ''}`}
                    className="rounded-circle me-3 grayscale"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-muted">{user.firstName} {user.lastName}</h5>
                    <p className="mb-1 text-muted">{user.role}</p>
                    <small className="text-muted">{user.email}</small>
                  </div>
                  <button 
                    onClick={() => toggleDisableEnable(user)}
                    className="btn btn-success btn-sm ms-2"
                  >
                    Enable
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No inactive users found</p>
          )}
        </div>
      </div>
  
      <style>{`
        .user-hover-effect {
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .user-hover-effect:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .grayscale {
          filter: grayscale(100%);
        }
      `}</style>
    </div>
  );
}

export default UserList;