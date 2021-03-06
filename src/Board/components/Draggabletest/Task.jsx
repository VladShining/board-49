import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import   './Task.scss'

const Container = styled.div`
    background-color: ${props =>props.isDragDisabled ?'#1a2230' : (props.isDragging && '#ff002880')};
    border:${props =>props.isDragDisabled ?'none' : (props.isDragging && '#92abcd solid 1px')}
    `;

export default class Task extends Component {
    // undisplayTask=()=>{
    //     const element = document.getElementsByClassName("task");
    //     console.log(element[0])
    //     for (let i = 0 ; i<element.length ;i++ )
    //         element[i].classList.add('undisplay')
       
    // }
    removeTask=()=>{
        this.props.delete(this.props.task.id);
    }
    render() {
        const isDragDisabled=this.props.task.id === 'task-1';
        return( 
        <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDragDisabled}>
            {(provided,snapshot)=>(
            <Container
                className='task'
                ref={provided.innerRef} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}  //ito no midesignez ny element andraisana azy (handle)
                isDragging={snapshot.isDragging}
                isDragDisabled={isDragDisabled}
                >
                    <div onMouseOver={this.undisplayTask} className="title">{this.props.task.content}</div>
                    <div className="icon" onClick={this.removeTask}><svg xmlns="http://www.w3.org/2000/svg" width="12.914" height="12.916" viewBox="0 0 12.914 12.916">
  <path id="minus" d="M6.457,12.912a6.458,6.458,0,1,1,4.565-1.892,6.457,6.457,0,0,1-4.565,1.892Zm0-11.906a5.448,5.448,0,1,0,5.448,5.449A5.448,5.448,0,0,0,6.457,1.006ZM9.232,5.95H3.682V6.958h5.55Zm0,0" transform="translate(0 0.004)" fill="#e5e5e5"/>
</svg></div>
            </Container>
            
            )}
        </Draggable>
        );
    }  
}
