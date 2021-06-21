import React , { useState,useEffect} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
// import Board from './Board/components/board/Board';
import BoardContainer from './Board/container/board-container'
import Nav from './Nav/Nav-container'
import Config from './Configuration/component/Config'
import Forofor from './ForoFor';
import Main from './Main/component/Main'
import Auth from './Auth/Auth'
import firebase from 'firebase/app';
import 'firebase/auth';
function App() {

  const [isLogin,setUser] = useState(false);
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            setUser(user.uid);
        }else{
            setUser(false);
        }
    });
        };
    useEffect(()=>{
        authListener();
    },[]);
  return (
    <div className="App">
     {isLogin ? (
     <BrowserRouter>
      <Nav/>
      <Switch>
        <Redirect exact path="/" to='/home' />
        <Route exact path="/home" component ={Main} />
        <Route path="/board" component ={BoardContainer } />
        <Route path="/setting" component={()=> <Config />} />
        {/* <Route path="/auth" component={Auth} /> */}
        <Route component={Forofor}/>
      </Switch>
      </BrowserRouter>):
      (<Auth/>)}
    </div>
  );
}

export default App;
