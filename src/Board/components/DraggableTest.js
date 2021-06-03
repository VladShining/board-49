import _ from 'lodash';
import React,{useState} from 'react';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';

const item = [{
    id:"1",
    name:"first"
},
{
    id:"2",
    name:"second"
},{
    id:"3",
    name:"third"
},{
    id:"4",
    name:"four"
}]

function DraggableTest() {
    const [state, setState] = useState({
        "todo":{
            title:"todo",
            items:[...item]
        }
    })
    return (
        <div>
            <DragDropContext onDragEnd={e=>console.log(e)}>
             {_.map(state,(data,key)=>{
                 return(
                    <>{data.title}
                    <Droppable droppableId={key}>
                        
                        {(provided)=>{
                            return(<div
                            ref={provided.innerRef}{...provided.droppableProps}>
                                {data.items.map((el,index)=>{
                                    return (
                                        <Draggable key = {el.id} index={index} draggableId={el.id}>
                                            {(provided) => {
                                                return(
                                                    <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                                        {el.name}
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                            </div>)
                        }}
                    </Droppable>
                    </>
                 )
             })}
            </DragDropContext>
        </div>
    )
}
export default DraggableTest;