import React,{useState,useEffect} from 'react';
import firebase from 'firebase/app';
import "firebase/auth";

export default function Authentification() {
    // eslint-disable-next-line
    const [user,setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    
   const clearInputs= () => {
    setEmail('');
    setPassword('');
}

const clearErrors= () =>{
    setEmailError('');
    setPasswordError('');
}
const handleSignUp = () =>{
 clearErrors();
 //alert("signUp ok");
    firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
     
    })
    .catch((err)=>{
        // eslint-disable-next-line
        switch (err.code){
             case "auth/email-already-in-use":
             case "auth/invalid-email":
                 setEmailError(err.message);
                 break;
             case "auth/weak-password":
                 setPasswordError(err.message);
                 break;
            
        }
    });
};

const handleSignin = () =>{
 clearErrors();
 alert("signIn ok");
 firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{

 })
 .catch((err)=>{
     // eslint-disable-next-line
     switch (err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
              setEmailError(err.message);
              break;
          case "auth/wrong-password":
              setPasswordError(err.message);
              break;
         
     }
 });
};
// eslint-disable-next-line
const handleLogout = () =>{
    firebase.auth().signOut();
    
};
const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            clearInputs();
            setUser(user.uid);
        }else{
            setUser("");
        }
    });
};
// eslint-disable-next-line
useEffect(()=>{    authListener();},[user]);
// let userNow = firebase.auth().currentUser
    return (
        <div className="Auth">
            Authentification
            {user && <div><p>already loged to {user.email} </p> <button onClick={handleLogout}> signout</button></div>}

            {hasAccount ?
                (<div className="SignupContainer">
                    <input type="text"
                        autoFocus
                        required 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <p> {emailError}</p>
                    <input type="password"
                        required 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input type="password"
                        required 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <p> {passwordError}</p>
                    <button onClick={handleSignUp}>Signup</button>
                </div>
                ):( 
                <div className="SigninContainer">
                    <input type="text"
                    autoFocus
                    required 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <p> {emailError}</p>
                    <input type="password"
                    required 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <p> {passwordError}</p>
                    <button onClick={handleSignin}>Signin</button>
                </div>
                 )}
           <button onClick={()=>setHasAccount(!hasAccount)}>switch to sign</button>
       </div>
    )
}