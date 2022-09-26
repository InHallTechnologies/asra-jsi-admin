import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../backend/firebase-handler';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react';
import context from '../context/app-context';
const accessMap = {"asra-jsi-admin@asrango.org":"ADMIN", "7828334945@asrango.org":"Dewas", "9406583434@asrango.org":"Guna", "9926379329@asrango.org":"Rajgarh"}

const AuthBox = ({children, className, loginScreen}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useContext(context)
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUserDetails({...userDetails, emailId:user.email, accessType:accessMap[user.email]})
                setAuthenticated(true);
                if (loginScreen) {
                    navigate(-1)
                }
            }else {
                setAuthenticated(false);
                navigate('/login')
            }
        })
    }, []);


    if (authenticated){
        return (
            <div className={className}>
                {children}
            </div>
        )
    }else {
        return(
            <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <CircularProgress isIndeterminate />
            </div>
        )
    }

    
}

export default AuthBox;

//admin@8205
//asra-jsi-admin@asrango.org