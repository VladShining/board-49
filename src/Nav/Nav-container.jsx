import React,{useState} from 'react'
import './NavContainer.scss'
import {Link} from 'react-router-dom';
import MenuSide from './MenuSide';

export default function Nav() {
  const [isMenu, setstate] = useState(false)
const toogleMenu=()=>{
  if(isMenu)
  setstate(false)
  else setstate(true)
}
    return (
  <div className="navbar">
           <div id="menuSide"> {isMenu && <MenuSide toogleMenu={toogleMenu} />}</div>
            <div style={{cursor: "pointer",zIndex:"4"}} onClick={toogleMenu} >
              <svg xmlns="http://www.w3.org/2000/svg" width="49.965" height="49.965" viewBox="0 0 49.965 49.965">
                  <g id="Groupe_31" data-name="Groupe 31" transform="translate(-19.5 -15.018)">
                    <g id="Groupe_10" data-name="Groupe 10" transform="translate(20 15.518)">
                      <g id="Groupe_9" data-name="Groupe 9" >
                        <path id="Tracé_6" data-name="Tracé 6" d="M41.794,7.172A24.482,24.482,0,1,0,7.171,41.795,24.482,24.482,0,1,0,41.794,7.172ZM24.482,46.016A21.533,21.533,0,1,1,46.015,24.483,21.557,21.557,0,0,1,24.482,46.016Z" transform="translate(0 -0.001)" fill="#fff" stroke="#11ece5" strokeWidth="1"/>
                      </g>
                    </g>
                    <g id="Groupe_12" data-name="Groupe 12" transform="translate(29.537 38.525)">
                      <g id="Groupe_11" data-name="Groupe 11">
                        <path id="Tracé_7" data-name="Tracé 7" d="M128.142,240.579H101.2a1.475,1.475,0,0,0,0,2.95h26.941a1.475,1.475,0,0,0,0-2.95Z" transform="translate(-99.726 -240.579)" fill="#fff"/>
                      </g>
                    </g>
                    <g id="Groupe_14" data-name="Groupe 14" transform="translate(31.504 30.414)">
                      <g id="Groupe_13" data-name="Groupe 13">
                        <path id="Tracé_8" data-name="Tracé 8" d="M144.771,155.76H121.763a1.475,1.475,0,0,0,0,2.95h23.008a1.475,1.475,0,1,0,0-2.95Z" transform="translate(-120.288 -155.76)" fill="#fff"/>
                      </g>
                    </g>
                    <g id="Groupe_16" data-name="Groupe 16" transform="translate(31.504 46.637)">
                      <g id="Groupe_15" data-name="Groupe 15">
                        <path id="Tracé_9" data-name="Tracé 9" d="M144.771,325.4H121.763a1.475,1.475,0,1,0,0,2.95h23.008a1.475,1.475,0,1,0,0-2.95Z" transform="translate(-120.288 -325.397)" fill="#fff"/>
                      </g>
                    </g>
                  </g>
            </svg></div>
        
            <div style={{cursor: "pointer" , zIndex:"999"}}> <Link to="/" ><svg xmlns="http://www.w3.org/2000/svg" width="629.233" height="539.933" viewBox="0 0 629.233 539.933">
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
              </svg></Link></div>
              <div style={{cursor: "pointer"}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="49.965" height="49.965" viewBox="0 0 49.965 49.965">
                <g id="Groupe_30" data-name="Groupe 30" transform="translate(-347.5 -16.492)">
                  <g id="Groupe_17" data-name="Groupe 17">
                    <path id="Tracé_6" data-name="Tracé 6" d="M41.794,7.172A24.482,24.482,0,1,0,7.171,41.795,24.482,24.482,0,1,0,41.794,7.172ZM24.482,46.016A21.533,21.533,0,1,1,46.015,24.483,21.557,21.557,0,0,1,24.482,46.016Z" transform="translate(348 16.991)" fill="#fff" stroke="#11ece5" strokeWidth="1"/>
                    <path id="Tracé_10" data-name="Tracé 10" d="M28.3,4.857A16.579,16.579,0,1,0,4.856,28.3,16.579,16.579,0,1,0,28.3,4.857ZM16.579,31.162A14.582,14.582,0,1,1,31.161,16.58,14.6,14.6,0,0,1,16.579,31.162Z" transform="translate(355.806 24.686)" fill="#fff"/>
                  </g>
                </g>
              </svg></div>

              <div className="menu">
                <ul>
                  <li id="main"> <Link to="/" >Accueil</Link> </li>
                  <li id="board"> <Link to="/board" >Board</Link> </li>
                  <li> <Link to="/setting" >Configuration</Link> </li>
                  <li> <Link to="/auth" > Deconnexion</Link> </li>  
                </ul>
              </div>
</div>
    )
}
