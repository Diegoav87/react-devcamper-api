import React, { useContext } from "react";

import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const auth = useAuth();

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="fas fa-laptop-code"></i> DevCamper
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {auth.user ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                    >
                                        <i className="fas fa-user"></i> Account
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link to="/manage-bootcamp" className="dropdown-item">
                                            Manage Bootcamp
                                        </Link>
                                        <Link to="/manage-reviews" className="dropdown-item" href="manage-reviews.html">Manage Reviews</Link>
                                        <Link className="dropdown-item" to="/manage-account">Manage Account</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/logout" className="dropdown-item">
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item d-none d-sm-block">
                                    <div className="nav-link">|</div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/bootcamps" className="nav-link">
                                        Browse Bootcamps
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        <i className="fas fa-sign-in-alt"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        <i className="fas fa-user-plus"></i> Register
                                    </Link>
                                </li>
                                <li className="nav-item d-none d-sm-block">
                                    <div className="nav-link">|</div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/bootcamps" className="nav-link">
                                        Browse Bootcamps
                                    </Link>
                                </li>
                            </ul>
                        )}

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
