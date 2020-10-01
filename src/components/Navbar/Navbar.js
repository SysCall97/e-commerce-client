import React, { useContext } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../View/View';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='navbar-container'>
            <Link to="/shop">Shop</Link>
            <Link to="/order-review">Order Review</Link>
            <Link to="manage-inventory">Manage Inventory here</Link>
            {
                loggedInUser.email?
                <Link onClick={() => setLoggedInUser({})}>Sign Out</Link> :
                <Link to="/login">Sign In</Link>
            }
        </div>
    );
};

export default Navbar;