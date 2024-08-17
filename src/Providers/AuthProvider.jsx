import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase.config";



export const AuthContext= createContext(null);

const auth = getAuth(app);
const googleProvider= new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,SetUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>
    {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile=(name,photo)=>
    {
        return updateProfile(auth.currentUser,
        {
            displayName:name,
            photoURL:photo
        })
    }

    const signIn=(email,password)=>
    {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleLogin=()=>
    {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }


    const logOut=()=>
    {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            SetUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unSubscribe();
        }
    },[])
    const authInfo={user,createUser,updateUserProfile,signIn,googleLogin,logOut,loading}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes=
{
    children:PropTypes.node
}