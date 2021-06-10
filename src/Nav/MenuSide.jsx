import React from 'react'
import './Menuside.scss'
import {Link} from 'react-router-dom';

export default function MenuSide(props) {
    return (
        <div className="menuside">
            <ul onClick={props.toogleMenu}>
                <li>
                <Link to="/" >Accueil</Link>
                </li>
                <li>
                <Link to="/board" >Board</Link>
                </li>
                <li>
                <Link to="/setting" >Configuration</Link>
                </li>
                <li>
                <Link to="/auth" > Deconnexion</Link> 
                </li>
            </ul>
        </div>
    )
}
