import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthChecker from '../utils/service/AuthChecker';
import Swal from 'sweetalert2';

function Header() {
    const isAuthenticated = AuthChecker.isAuthenticated();
    const isAdmin = AuthChecker.isAdmin();
    const isUser = AuthChecker.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Log out of your account?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log out"
        }).then((result) => {
            if (result.isConfirmed) {
                AuthChecker.logout();
                navigate('/login');
            }
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">Royal Hotel</NavLink>
            </div>

            <ul className="navbar-ul">
                <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>

                <li><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>

                <li><NavLink to="/find-booking" activeclassname="active">Find my Booking</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}

                {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/register" activeclassname="active">Register</NavLink></li>}

                {isAuthenticated && <li style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Header;
