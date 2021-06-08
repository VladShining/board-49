import React from 'react';
import './App.scss';
// import Board from './Board/components/board/Board';
import BoardContainer from './Board/container/board-container'
import Nav from './Nav/Nav-container'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div>
        <BoardContainer/>
      </div>
    </div>
  );
}

export default App;
