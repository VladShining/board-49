import React from 'react';
import './App.scss';
// import Board from './Board/components/board/Board';
import BoardContainer from './Board/container/board-container'
import Nav from './Nav/Nav-container'

function App() {
  return (
    <div className="App">
      <Nav/>
      <BoardContainer/>
    </div>
  );
}

export default App;
