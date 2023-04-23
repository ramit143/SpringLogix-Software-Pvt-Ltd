
// Import necessary packages and components
import { BrowserRouter, Routes, Route,  Link } from "react-router-dom";
import ProfileForm from "./profileform";
import { CrudIndex } from '../crud-operation/crud-index';
import { CrudDetails } from '../crud-operation/crud-details';
import { CrudUpdate } from '../crud-operation/crud-update';

// Define the ProfileMainPage component
export function ProfileMainPage() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        {/* Navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Profile Form
            </Link>
            {/* Hamburger menu */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Navigation menu */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/getUser" className="nav-link">
                    User List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/getOneUser/:id" element={<CrudDetails />} />
          <Route path="/updateUser/:id" element={<CrudUpdate />} />
          <Route path="/getUser" element={<CrudIndex />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



