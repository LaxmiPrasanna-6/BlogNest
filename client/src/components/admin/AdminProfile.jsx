import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminProfile() {
  return (
    <div>
      <ul className="d-flex justify-content-around list-unstyled fs-1">
        <li className="nav-item">
          <Link to="users" className="nav-link">
            List
          </Link>
        </li>
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminProfile;