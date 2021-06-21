import firebase from 'firebase/app';
import 'firebase/auth';
import React , { useState } from "react";
import Signup from './component/Signup';
import Login from './component/Login';

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
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
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
                 setEmailError(err.message);
                 break;
             case "auth/wrong-password":
                 setPasswordError(err.message);
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
       <div className="Auth">
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