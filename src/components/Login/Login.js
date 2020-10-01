import React from 'react';
import { useState } from 'react';
import {
    initializeLoginFramework,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogleAccount,
    signInWithGithubAccount
} from './logInManager';
import { useContext } from 'react';
import { UserContext } from '../View/View';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    initializeLoginFramework();
    const divStyle = {
        marginTop: "5vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
    const btnStyle = {
        marginTop: "2vh"
    }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [emailLogIn, setEmailLogIn] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        isLoggedIn: false,
        error: ""
    })

    const handleSubmitEmail = (event) => {
        if (isNewUser && user.email && user.password) {
            createUserWithEmailAndPassword(user)
                .then(res => {
                    setUser(res);
                    if (res.isLoggedIn) {
                        setLoggedInUser(res);
                        history.replace(from);
                    }
                })
        } else if (!isNewUser && user.email && user.password) {
            signInWithEmailAndPassword(user)
                .then(res => {
                    setUser(res);
                    if (res.isLoggedIn) {
                        setLoggedInUser(res);
                        history.replace(from);
                    }
                })
        }
        event.preventDefault();
    }

    const handleGooleLogIn = () => {
        signInWithGoogleAccount(user)
            .then(res => {
                setUser(res);
                if (res.isLoggedIn) {
                    setLoggedInUser(res);
                    history.replace(from);
                }
            })
    }

    const handleGithubLogIn = () => {
        signInWithGithubAccount(user)
            .then(res=> {
                setUser(res);
                if (res.isLoggedIn) {
                    setLoggedInUser(res);
                    history.replace(from);
                }
            })
    }

    const handleBlur = (event) => {
        let isValid = false;
        if (event.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(event.target.value);
        } else if (event.target.name === "password") {
            isValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
        }
        if (isValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }


    return (
        <div style={divStyle}>
            <button onClick={handleGooleLogIn} style={btnStyle}>Log in with Google</button>
            <button onClick={() => setEmailLogIn(!emailLogIn)} style={btnStyle}>Log in with Email</button>
            <button onClick={handleGithubLogIn} style={btnStyle}>Log in with GitHub</button>

            {
                emailLogIn && <>
                    <br />
                    <form onSubmit={handleSubmitEmail}>
                        <input type="checkbox" name="newUser" id="newUser" onClick={() => setIsNewUser(!isNewUser)} />
                        <label htmlFor="newUser">New User</label> <br />

                        <input type="email" onBlur={handleBlur} name="email" id="email" placeholder="Example@email.com" /> <br />
                        <input type="password" onBlur={handleBlur} name="password" id="password" placeholder="Password" /> <br />
                        <input type="submit" value={isNewUser ? "Sign up" : "Sign in"} />
                    </form>
                    <p style={{ color: "red" }}>{user.error}</p>
                </>
            }
        </div>
    );
};

export default Login;