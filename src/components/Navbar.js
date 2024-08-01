import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navbar = () => {

    function handleLogOut() {
        console.log("Log out to be implemented");
    }

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
                    <Link to="/edit" style={{ textDecoration: 'none', color: 'black' }}>Edit</Link>
                </li>
                <li>
                    <Button onClick={() => handleLogOut()}>Log out</Button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;