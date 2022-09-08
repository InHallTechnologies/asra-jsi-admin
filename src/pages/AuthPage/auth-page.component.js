import { signInWithEmailAndPassword } from "firebase/auth";
import "./auth-page.style.css"
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../backend/firebase-handler";
import { Button, ButtonGroup, Input } from '@chakra-ui/react';
import illustration from "../../assets/login_illustration.png";
import asraLogo from "../../assets/asra_logo.png";
import jsiLogo from "../../assets/jsi_logo.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AuthPage = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, emailId, password).then(() => {
            navigate('/')
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast(err.message);
        })
    }

    return(
        <div>
            <div className="auth-container">
                <div className="illus-container">
                    <img src={illustration} alt="JSI-Asra" className="login-illus" />
                </div>
                <div className="auth-box">

                    <div className="logo-container">
                        <img src={jsiLogo} alt="John Snow, Inc." className="logo" style={{ marginRight: 10 }} />
                        <img src={asraLogo} alt="Asra Samajik Lok Kalyan Samiti" className="logo" />
                    </div>
                    <p className="form-title">Welcome Back!</p>

                    <div className="input-container">
                        <p className="input-label">Email-ID</p>
                        <Input placeholder="sample@abc.com" value={emailId} onChange={(event) => { setEmailId(event.target.value) }} />
                    </div>

                    <div className="input-container">
                        <p className="input-label">Password</p>
                        <Input placeholder="* * * * * * * *" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </div>

                    <Button disabled={loading} isLoading={loading} bgColor="#53A86B" color="#fff" className="submit-button" onClick={handleLogin}>LOGIN</Button>

                </div>
            </div>
            <ToastContainer />
        </div>
        
    )
}

export default AuthPage