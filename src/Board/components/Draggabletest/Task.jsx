import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import   './Task.scss'

const Container = styled.div`
    background-color: ${props => (props.isDragging && '#eee')};
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
                >
                    <div className="title">{this.props.task.content}</div>
                    <div className="icon" onClick={this.removeTask}><img src="/assets/icon/minus.svg" alt=""/></div>
            </Container>
            
            )}
        </Draggable>
        );
    }  
}
