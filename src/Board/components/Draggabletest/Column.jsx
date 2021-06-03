import React, { Component } from 'react'
import {Droppable } from 'react-beautiful-dnd';
import Task from './Task'
import styled from'styled-components';

const Container = styled.div`
background-color:${props => (props.isDraggingOver ?'skyblue': 'red')};

`;
const Title = styled.div`
    font-size:40px;
    color:red;
`;
export default class Column extends Component {
  
  delete=()=>{
    this.props.deleteCol(this.props.column.id)
    //   console.log(this.props.column.id);
  }
  
       render() {
        return (
        <div>
            <Title>
            {this.props.column.title}
            </Title>
            <p onClick={this.delete}>X</p>
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
