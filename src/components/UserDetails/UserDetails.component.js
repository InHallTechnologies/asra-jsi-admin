import React from "react";
import './UserDetails.style.css';
import asra from '../../assets/asra_logo.png';
import jsi from '../../assets/jsi_logo.jpg';
import logo from "../../assets/logo.png"

const UserDetails = () => {
    return(
        <div className="user-details-strip-container">
            <div>
                <img src={logo} className="logo" />
                <div className="user-details-strip-name-container">
                    
                    <p className="hello-label">Hello,</p>
                    <h2 className="strip-operator-name">Admin</h2>
                </div>
            </div>
            

            <div className="logo-container">
                <img className="logo jsi"  src={jsi} alt="John Snow, Inc" />
                <img  className="logo asra" src={asra} alt="Asra Samajik Lok Kalyan Samiti" />
            </div>
        </div>
    )
}

export default UserDetails;