import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../backend/firebase-handler';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react';

const AuthBox = ({children, className, loginScreen}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
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