import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
// import Board from './Board/components/board/Board';
import BoardContainer from './Board/container/board-container'
import Nav from './Nav/Nav-container'
import Config from './Configuration/component/Config'
import Forofor from './ForoFor';
import Main from './Main/component/Main'
import Auth from './Auth/component/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/" component ={Main} />
        <Route path="/board" component ={BoardContainer} />
        <Route path="/setting" component={Config} />
        <Route path="/auth" component={Auth} />
        <Route component={Forofor}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
