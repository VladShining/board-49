import React from 'react'
import '../style/Auth.scss'

export default function Login(props) {
       return(
            <div className="SignupContainer">
                <input type="text"
                  autoFocus
                  required 
                  value={props.email} 
                  onChange={(e)=>props.setEmail(e.target.value)}
                />
                <p> {props.emailError}</p>
                <input type="password"
                  required 
                  value={props.password} 
                  onChange={(e)=>props.setPassword(e.target.value)}
                />
                <p> {props.passwordError}</p>
                <button onClick={props.handleSignin}>Connexion</button>
            </div>
    )
}
