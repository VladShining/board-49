import firebase from 'firebase/app';
import 'firebase/auth';
import React , { useState } from "react";
import Signup from './component/Signup';
import Login from './component/Login';
import './style/Auth.scss'
const Auth = () => {
//    const [user,setUser] = useState('');
   const [email,setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError,setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [hasAccount,setHasAccount] = useState(true);
    // let history = useHistory();

   const clearErrors= () =>{
       setEmailError('');
       setPasswordError('');
   }
   const handleSignUp = () =>{
    clearErrors();
       firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
     
       })
       .catch((err)=>{
           switch (err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError("Erreur email");
                    break;
                case "auth/weak-password":
                    setPasswordError("Erreur mot de passe");
                    break;
                default: break;
           }
       });
   };

   const handleSignin = () =>{
    clearErrors();
     firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{

    })
    .catch((err)=>{
        switch (err.code){
             case "auth/invalid-email":
             case "auth/user-disabled":
             case "auth/user-not-found":
                 setEmailError("Email invalide");
                 break;
             case "auth/wrong-password":
                 setPasswordError("Mot de passe invalide");
                 break;
            default: break;
        }
    });
            // firebase.auth().currentUser.sendEmailVerification()
            // .then(() => {
            //     // Email verification sent!
            //     // ...
            // });
    };
  
//    const authListener = () => {
//        firebase.auth().onAuthStateChanged(user=>{
//            if(user){
//                clearInputs();
     
//            }else{

//            }
//        });
//    };
//    useEffect(()=>{
//        authListener();
//    });

   return(
       <div className="auth">
            <div style={{cursor: "pointer" , zIndex:"999"}} id="logo"> <svg xmlns="http://www.w3.org/2000/svg" width="629.233" height="539.933" viewBox="0 0 629.233 539.933">
                <g id="Groupe_33" data-name="Groupe 33" transform="translate(-2649 -172.958)">
                  <g id="Groupe_32" data-name="Groupe 32" transform="translate(3278.234 712.891) rotate(180)">
                    <path id="Tracé_1" data-name="Tracé 1" d="M207.3,0,414.6,120.588H0Z" transform="matrix(0.5, -0.866, 0.866, 0.5, 0, 359.051)" fill="#fff"/>
                    <path id="Tracé_11" data-name="Tracé 11" d="M207.3,0,414.6,120.588H0Z" transform="translate(421.935 0) rotate(60)" fill="#fff"/>
                    <path id="Polygone_4" data-name="Polygone 4" d="M210.184,0,420.369,120.588H0Z" transform="translate(524.802 539.933) rotate(180)" fill="#fff"/>
                  </g>
                  <line id="Ligne_3" data-name="Ligne 3" x2="210.08" y2="119.242" transform="translate(2753.5 293.5)" fill="none" stroke="#fff" strokeWidth="1"/>
                  <line id="Ligne_4" data-name="Ligne 4" x1="209.92" y2="119.242" transform="translate(2963.58 293.5)" fill="none" stroke="#fff" strokeWidth="1"/>
                  <line id="Ligne_5" data-name="Ligne 5" y1="241.758" x2="0.08" transform="translate(2963.5 412.742)" fill="none" stroke="#fff" strokeWidth="1"/>
                </g>
              </svg>  </div>
           {hasAccount ? ( 
               <>
           <Login email={email}
                setEmail={setEmail}
                password={password} 
                setPassword={setPassword}
                handleSignin={handleSignin}
                 
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError} 
                passwordError={passwordError}
            />
            <button onClick={()=>setHasAccount(!hasAccount)}>Créer un compte</button>
            </>
           ):(
           <><Signup email={email}
                setEmail={setEmail}
                password={password} 
                setPassword={setPassword}
                  
                handleSignUp={handleSignUp} 
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError} 
                passwordError={passwordError}
            />
                <button onClick={()=>setHasAccount(!hasAccount)}>Inscription</button>
                </>
           )}
       </div> 
   );
};
export default Auth ;