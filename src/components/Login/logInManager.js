import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// initialization
export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// create new account with email
export const createUserWithEmailAndPassword = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.isLoggedIn = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}

// sign in with existing email and password
export const signInWithEmailAndPassword = (user) => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(response => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.isLoggedIn = true;
            return newUserInfo;
        })
        .catch(function (error) {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}

// sign in with google account
export const signInWithGoogleAccount = (user) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            const newUserInfo = { ...user };
            newUserInfo.name = result.user.displayName;
            newUserInfo.email = result.user.email;
            newUserInfo.error = "";
            newUserInfo.isLoggedIn = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}

// sign in with github
export const signInWithGithubAccount = (user) => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            const newUserInfo = { ...user };
            newUserInfo.name = result.user.displayName;
            newUserInfo.email = result.user.email;
            newUserInfo.error = "";
            newUserInfo.isLoggedIn = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}