import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from 'react-redux';
import { setGlobalVariable } from "../../actions/LoginProfile/actions";
import './login.css'

const clientID = "1044229163626-gdfufnfo00da8e89it6pp15upf7fbc3q.apps.googleusercontent.com";

const Login = () => {
    const dispatch = useDispatch();
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState(null);
    let timer; 

    const onSuccess = (res) => {
        handleupdateUser(res.profileObj)
    };

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    };

    const handleupdateUser = (newAccesoryState) => {
        setUserImage(newAccesoryState.imageUrl);
        setUserName(newAccesoryState.givenName);
        timer = setTimeout(() => {
            dispatch(setGlobalVariable('user', newAccesoryState));
        }, 2200);
    };

    useEffect(() => {
        const start = () => {
            try {
                gapi.auth2.init({
                    clientId: clientID,
                });
            } catch (error) {
                console.error('Error initializing Google Auth:', error);
            }
        };
    
        try {
            gapi.load("client:auth2", start);
        } catch (error) {
            console.error('Error loading Google Auth client:', error);
        }
        clearTimeout(timer)
    }, []);

    return (
        <div>
            <div className="card">
                <div className="card-border-top">
                </div>
                <div className="img" style={{ backgroundImage: `url(${userImage})` }}></div>
                <span>{userName ? userName : 'Person'}</span>
                <span className="text-black font-semibold">Google Login</span>
                <div className="flex justify-center align-center">
                    <GoogleLogin
                        clientId={clientID}
                        buttonText="LogIn"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        style={{ alignContent: 'center' }}
                    />
                </div>
            </div>

        </div>
    );
};

export default Login;
