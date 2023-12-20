import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ currentUser, logout }) {

    function onSignOutButtonClick(){
        console.log('Logging out')
    }

    if (!currentUser){
        return (
            <>
                <div className='navigation-bar'>
                    <Link to="/" className="navigation-button">Home</Link>
                    <Link to="/inventory" className="navigation-button">All Inventory</Link>
                    <Link to="/about" className="navigation-button">About</Link>
                    <Link to="/login" className="navigation-button">Login</Link>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='navigation-bar'>
                    <Link to="/" className="navigation-button">Home</Link>
                    <Link to="/inventory" className="navigation-button">All Inventory</Link>
                    <Link to="/sellcar" className="navigation-button">List a Car</Link>
                    <Link to="/about" className="navigation-button">About</Link>
                    <Link to="/profile/:userID" className="navigation-button">Profile</Link>
                    <Link to="/myfavorites" className="navigation-buttono">Saved for Later</Link>
                    <Link to="/shoppingcart" className="navigation-button">My Cart</Link>
                    <button onClick={logout} className="navigation-button">Logout</button>
                    {/* <button>Sign Out</button> */}
                </div>
            </>
        )
    }
}

export default NavBar