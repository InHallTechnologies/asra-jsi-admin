import React, { useContext } from "react";
import './UserDetails.style.css';
import asra from '../../assets/asra_logo.png';
import jsi from '../../assets/jsi_logo.jpg';
import logo from "../../assets/logo.png"
import context from "../../context/app-context";

const UserDetails = () => {

    const [userData, setUserData] = useContext(context)

    console.log(userData)

    return(
        <div className="user-details-strip-container">
            <div>
                <img src={logo} className="logo" />
                <div className="user-details-strip-name-container">
                    
                    <p className="hello-label">Hello,</p>
                    <h2 className="strip-operator-name">{userData.name}</h2>
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