import React,{useState} from 'react'
import {v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../components/Draggabletest/Column';
import firebase from 'firebase/app';
import 'firebase/firestore';
// eslint-disable-next-line
import initialData from './initData';
import './Board.scss';

function Board() {

    const dataStore=localStorage.getItem("data49");
    let dataUsed =initialData
    if (dataStore){
        dataUsed = JSON.parse(dataStore)
    }
    const [data, setState] = useState(dataUsed)

// useEffect(() => {
//     const firestore = firebase.firestore();
//     const ref = firestore.collection('board');
//     ref.doc("data").get().then((doc) => {
//         const Data = doc.data()
//         setState(Data)
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
//  },[])
// useEffect(() => {
//     data && change(data)
//     // eslint-disable-next-line
// },[data])

// const change = (prop)=>{
//     const update = async(e) => {
//         await ref.doc("data").set(prop).then(() => {
//         // console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.log("Error writing document: ", error);
//     });
//     }
//     update()
// }

const addTask=()=>{
    
    let el = document.getElementById('task').value;
    if(el){
        const elID=uuidv4()
        const newtask = {
            ...data,
            tasks:{
            ...data.tasks,
            [elID]:{id:elID,content:el} 
        }}
    // data=newtask;
    setState(newtask)
    data.columns[Object.keys(data.columns)[0]].taskIds.push(elID)
    
}
}

function removeTask(id){
    const elem= data.columns
    const el= Object.values(elem)
    for(let i=0 ;i<el.length;i++)
    {
        el[i].taskIds=el[i].taskIds.filter(ele=>ele!==id)
    }
    delete data.tasks[id]
    // change(data)
   
}
const addColumn=()=>{
    
    var el =document.getElementById('column').value
    if(el){
    const colID=uuidv4()
    const newColumn ={
        ...data,
        columns:{
         ...data.columns,
         [colID]:{id:colID,title:el,taskIds:[]}
        }
     }
     setState(newColumn);
     data.columnOrder.push(colID);
     
      }
 }
 function removeColumn(id){
    const colContent = data.columns[id].taskIds
    
    if(colContent.length!==0){
        return;
    }
    else{
        delete data.columns[id];
        data.columnOrder=data.columnOrder.filter(ele=>ele!==id)
        // change(data)
    };
 }
 const onDragEnd = result =>{
    document.body.style.backgroundColor ='inherite'
    console.clear()
    const {destination,source,draggableId }=result;
    if(!destination){ 
        return;
    }
    if( destination.droppableId === source.droppableId &&
        destination.index === source.index
    ){ 
            return;
    }
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if(start===finish){
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn= {
            ...start,
            taskIds:newTaskIds,
        };
        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newColumn.id]:newColumn,
            },
        };
        setState(newState)
         return;
    }
    
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index,1);
    const newStart = {
        ...start,
        taskIds:startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index,0,draggableId);
    const newFinish = {
        ...finish,
        taskIds:finishTaskIds,
    };
    const newState = {
        ...data,
        columns: {
            ...data.columns,
            [newStart.id]:newStart,
            [newFinish.id]:newFinish,
        },
    };
   setState(newState)
};
const onDragUpdate=(update)=>{
    const {destination}=update;
    const opacity = destination ? destination.index / Object.keys(data.tasks).length :0;
    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
}
const onDragStart=()=>{
    document.body.style.transition = 'background-color 0.2s ease';
}
const manualSave=()=>{
    localStorage.setItem('data49',JSON.stringify(data))
}
const onLineLoad=()=>{
    const ref =firebase.firestore().collection('board');
    ref.doc("data").get().then((doc) => {
        const Data = doc.data()
        setState(Data)
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
const onLineSave=async(e)=>{
    const ref =firebase.firestore().collection('board');
    await ref.doc("data").set(data).then(() => {
    }).catch((error) => {
        console.log("Error writing document: ", error);
    });  
}
    
return (
        <div className="board">
            <DragDropContext 
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
            >
                {data && data.columnOrder.map(columnId =>{
                    const column =data.columns[columnId];
                    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                    return (<Column key={column.id} column={column} tasks={tasks} deleteCol={removeColumn} delete={removeTask}/> );
                })}

            </DragDropContext>
            <div className="boutton">
                <input type='text' id='task'/>
                <button onClick={addTask} >
                    Ajout Tache 
                </button>
                <input type='text' id='column' required/>
                <button onClick={addColumn} >
                    Nouveau Colonne 
                </button>
                <button onClick={manualSave} id='save'>save</button>
                <button onClick={onLineSave} id='onlinesave'>save online</button>
                <button onClick={onLineLoad} id='onlineload'>load</button>
            </div>
        </div>
    )
}

export default Board
