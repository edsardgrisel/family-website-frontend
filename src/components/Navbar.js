import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navbar = ({ handleLogout }) => {
    const userName = localStorage.getItem('userName');

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'lightgray', padding: '1rem' }}>
            <div>
                <h1>Grisel Family</h1>
            </div>
            <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
                <li>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
                </li>
                <li>
                    <Link to="/folders" style={{ textDecoration: 'none', color: 'black' }}>Folders</Link>
                </li>
                <li>
                    <Link to="/add-folder" style={{ textDecoration: 'none', color: 'black' }}>Add Folder</Link>
                </li>
                <li>
                    <Link to="/set-home-photo" style={{ textDecoration: 'none', color: 'black' }}>Set Home Photo</Link>
                </li>
                <li>
                    <Link to="/calendar" style={{ textDecoration: 'none', color: 'black' }}>Calendar</Link>
                </li>
                <li>
                    <Link to="/chat" style={{ textDecoration: 'none', color: 'black' }}>Chat</Link>
                </li>
                <li>
                    <Button onClick={handleLogout}>
                        {userName ? `Log Out of ${userName}` : 'Log Out'}
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;