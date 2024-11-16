import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";




// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
    const auth = getAuth(app)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] =useState(null)
    const [loading, setLoading]= useState(true)
    // console.log(loading)

    const createNewUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email, password)
    }
    const userLogin=(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }
    const logOut=() => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile=(updatedData)=>{
        return updateProfile(auth.currentUser,  updatedData)
    } 
    
    const authInfo ={
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        updateUserProfile

    }

    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return ()=> {
            unsubscribe();
        }
    },[])

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{ children }</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;