import React from "react";
import { FaCar, FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons library

// Header component for the site

function Header() {
    return (
        <>
            <div className="header-container">
                <div className="logo-container">
                    <img
                        className="logo-image"
                        src="/assets/RED-Line-Logo.png"
                        alt="Red-Line Dealership Logo"
                    />
                </div>
                <div className="contact-info">
                    <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <span>(347) 456-7890</span>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <span>info@redlinedealership.com</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
