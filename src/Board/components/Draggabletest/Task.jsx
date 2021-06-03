import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import   './Task.scss'

const Container = styled.div`
    background-color: ${props => (props.isDragging && 'red')};
`;

export default class Task extends Component {
    
    removeTask=()=>{
        this.props.delete(this.props.task.id);
    }
    render() {
        return( 
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided,snapshot)=>(
            <Container 
                className='task'
                ref={provided.innerRef} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}  //ito no midesignez ny element andraisana azy (handle)
                isDragging={snapshot.isDragging}
            >{this.props.task.content}
            <p onClick={this.removeTask}>X</p>
            </Container>
            
            )}
        </Draggable>
        );
    }  
}
