import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header-container'>
            <Link to="/"> <img className='logo' src={logo} alt=""/> </Link>
            <Navbar />
        </div>
    );
};

export default Header;