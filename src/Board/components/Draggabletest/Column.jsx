import React, { Component } from 'react'
import {Droppable } from 'react-beautiful-dnd';
import Task from './Task'
import styled from'styled-components';
import './Column.scss';

const Container = styled.div`
    background-color:${props => (props.isDraggingOver ?'#1a223055': '#1a2230')};
    padding:0;
    box-sizing: border-box;
    border: 1px solid #111;
    border-top:1px solid #111f;
    border-radius: 0 0 7px 7px;
    box-shadow: 0px 0px 10px #ff0028;
`;
const Title = styled.div`
    font-size:1.2em;
    font-family: monospace;
    color:#92abcd;
    padding:0 1em;
    max-width:70px;
    text-overflow: ellipsis;
    overflow:hidden;
`;
const Header = styled.div`
    border: 1px solid #111;
    border-radius: 7px 7px 0 0;
    display:flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0.2em 0;
    position :sticky;
    top:0;
    background-color:#212c3d;
    width:250px;
    box-shadow: 0px -3px 7px #ff0028;

`;
export default class Column extends Component {
  
  delete=()=>{
    this.props.deleteCol(this.props.column.id)
    //   console.log(this.props.column.id);
  }
       render() {
        return (
        <div className="drop">
            <Header>
                <Title>
                    {this.props.column.title}
                </Title>
                    <div className="icon" >
                        <ul>
                            <li><img src="/assets/icon/add.svg" alt=""/></li>
                            <li><svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" width="12.996" height="12.935" viewBox="0 0 12.996 12.935">
                                <g id="Calque_1" data-name="Calque 1" transform="translate(0 0)">
                                    <path id="Tracé_294" data-name="Tracé 294" d="M12,8.12a.32.32,0,0,0-.32.32v2.87a1,1,0,0,1-1,1H1.62a1,1,0,0,1-1-1V2.88a1,1,0,0,1,1-1H4.49a.325.325,0,1,0,0-.65H1.62A1.62,1.62,0,0,0,0,2.88v8.44a1.62,1.62,0,0,0,1.62,1.62H10.7a1.62,1.62,0,0,0,1.62-1.62V8.44A.32.32,0,0,0,12,8.12Zm0,0" transform="translate(0 -0.005)" fill="#707070"/>
                                    <path id="Tracé_295" data-name="Tracé 295" d="M12.19.43a1.46,1.46,0,0,0-2.06,0L4.36,6.2a.32.32,0,0,0-.08.14L3.51,9.09a.32.32,0,0,0,.4.4l2.74-.76a.32.32,0,0,0,.14-.08l5.78-5.78a1.46,1.46,0,0,0,0-2.06Zm-7.13,6L9.79,1.69l1.52,1.52L6.59,7.94ZM4.76,7,6,8.24l-1.68.47Zm7.36-4.62-.34.34L10.25,1.23l.34-.34a.81.81,0,0,1,1.14,0l.38.38a.81.81,0,0,1,0,1.14Zm0,0" transform="translate(0 -0.005)" fill="#707070"/>
                                </g>
                                </svg>
                            </li>
                            <li onClick={this.delete}><svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" width="11.47" height="12.3" viewBox="0 0 11.47 12.3">
                                <g id="Calque_1" data-name="Calque 1">
                                    <path id="Tracé_292" data-name="Tracé 292" d="M9.17,12.3H2.28a.48.48,0,0,1-.48-.44L1,2.81H0v-1H11.47v1h-1l-.8,9.05A.48.48,0,0,1,9.17,12.3Zm-6.45-1h6l.75-8.53H2ZM7.87,9.9h-1l.21-5.7h1ZM3.6,9.9,3.39,4.2h1L4.6,9.9Zm2.62,0h-1V4.22h1Z" transform="translate(0 0)" fill="#707070"/>
                                    <path id="Tracé_293" data-name="Tracé 293" d="M8.11,2.33h-1V1H4.32V2.33h-1V.8a.8.8,0,0,1,.8-.8H7.31a.8.8,0,0,1,.8.8Z" fill="#707070"/>
                                </g>
                                </svg>
                            </li>
                        </ul>
                    </div>
            </Header>
            <Droppable droppableId={this.props.column.id}>
                {(provided,snapshot)=>(
                <Container ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    isDraggingOver={snapshot.isDraggingOver} 
                   
                >  
                    {this.props.tasks.map((task,index) => (
                    <Task key={task.id} task={task} index={index} delete={this.props.delete} />
                ))
                    }  
                    {provided.placeholder}
                  
                   
                </Container>
            )}
            
            </Droppable>
            
        </div>
        );
    }
}
