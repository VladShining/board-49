// eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import {v4 as uuidv4 } from 'uuid';
import { DragDropContext ,Droppable} from 'react-beautiful-dnd';
import Column from '../../components/Draggabletest/Column';
import firebase from 'firebase/app';
import 'firebase/firestore';
import initialData from './initData';
import './Board.scss';

function Board(props) {
    const userId=props.userId;
    const dataStore=localStorage.getItem("data49");
   
    if (!dataStore){
        localStorage.setItem('data49',JSON.stringify(initialData))
        userId && firebase.firestore().collection('board').doc(userId).set(data)
    }
    const [text,setMessage]=useState('');
    const [data, setState] = useState(JSON.parse(dataStore))
    
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
useEffect(() => {
    (props.save) && manualSave()
    // eslint-disable-next-line
},[data])

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
const showMessage=(msg)=>{
    setMessage(msg)
    setTimeout(()=>{setMessage('')},2000)   
}
const addTask=(id)=>{
    let el = document.getElementById('task').value;
    if(el){
        const elID=uuidv4()
        data.columns[id].taskIds.push(elID)   
        const newtask = {
            ...data,
            tasks:{
                ...data.tasks,
                [elID]:{id:elID,content:el} 
            }}
            setState(newtask)
            showMessage('tache ajouter')
}
document.getElementById('task').value='';
}

function removeTask(id){
    const elem= data.columns
    const el= Object.values(elem)
    for(let i=0 ;i<el.length;i++)
    {
        el[i].taskIds=el[i].taskIds.filter(ele=>ele!==id)
    }
    delete data.tasks[id]
    setState(data)
    showMessage('tache supprimer')

}
const addColumn=()=>{
    
    var el =document.getElementById('column').value
    if(el){
    const colID=uuidv4()
    data.columnOrder.push(colID);
    const newColumn ={
        ...data,
        columns:{
         ...data.columns,
         [colID]:{id:colID,title:el,taskIds:[]}
        }
     }
     setState(newColumn);
     showMessage('Colonne ajouter')
     
    }
    document.getElementById('column').value=''
 }
 function removeColumn(id){
    const colContent = data.columns[id].taskIds
    
    if(colContent.length!==0){
        return;
    }
    else{
        delete data.columns[id];
        data.columnOrder=data.columnOrder.filter(ele=>ele!==id)
        setState(data)
        showMessage('Colonne supprimer')

    };
 }
 const onDragEnd = result =>{
    document.body.style.backgroundColor ='inherite'
    console.clear()
    const {destination,source,draggableId,type}=result;
    if(!destination){ 
        return;
    }
    if( destination.droppableId === source.droppableId &&
        destination.index === source.index
    ){ 
            return;
    }
    if(type ==='column'){
        const newColumnOrder =Array.from(data.columnOrder);
        newColumnOrder.splice(source.index,1)
        newColumnOrder.splice(destination.index,0,draggableId);
        const newState ={
            ...data,
            columnOrder:newColumnOrder,
        };
        setState(newState);
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
    showMessage('Enregistrement...')

}
const onLineLoad=()=>{
    const ref =firebase.firestore().collection('board');
    ref.doc(userId).get().then((doc) => {
        const Data = doc.data()
        setState(Data)
        showMessage('Telechargement effectué')

    }).catch((error) => {
        console.log("Error getting document:", error);
        showMessage('Vous êtes offline')

    });
}
const onLineSave=async()=>{
    const ref =firebase.firestore().collection('board');
    showMessage('Sauvegarde enligne...')
    await ref.doc(userId).set(data).then(() => {
        showMessage('Sauvegarde effectuer')

    }).catch((error) => {
        console.log("Error writing document: ", error);
        showMessage('Vous êtes offline')

    });  
}
const search=()=>{
        const element = document.getElementsByClassName("task");
        const input = document.getElementById('column')
        const val = input && input.value
        if (val){
            const tab = Object.values(data.tasks) 
            const ret=tab.filter(ele=>ele.content===val)
            if (ret[0]){  
                showMessage(`${ret.length}  element trouver`)
                for( let j=0 ;j<element.length ;j++){
                    if(element[j].children[0].innerHTML !== ret[0].content)
                        element[j].classList.add('undisplay')
                }
            }else{
                 showMessage('Aucun element trouver')
                for( let j=0 ;j<element.length ;j++)
                    element[j].classList.add('undisplay')
            }
        }
}
const resetSearch=()=>{
    const element = document.getElementsByClassName("task");
    for( let j=0 ;j<element.length ;j++){
            element[j].classList.remove('undisplay')
    }
}
return (
        <div className="board">
            <p className="notif">{text}</p>
             <div className="boutton">
                 <div className="left" >
                    <label className="lab" onMouseDown={props.tooglesave} onClick={manualSave}>
                        <input type="checkbox" id="autosave" name="autosave" value='ok'/>
                        <span className="checkmark" ></span>
                    </label>
                    <button onClick={onLineSave} id='onlinesave'>📤</button>
                    <button onClick={onLineLoad} id='onlineload'>📥</button>
                 </div>
                <input type='text' id='column' maxLength='9' onChange={resetSearch} />
                <div className="left" >
                    <button onClick={addColumn} >➕</button>
                    <button onClick={search} id='search' >🔍</button>
                    <button onClick={manualSave} id='save'>💾</button>
                </div>
            </div>
            <div>
            <DragDropContext 
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
            > 
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided)=><div className='boards'
                    {...provided.droppableProps} 
                    ref={provided.innerRef}>
                    {data && data.columnOrder.map((columnId,index) =>{
                        const column =data.columns[columnId];
                        const lastCol=data.columnOrder;
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                        return (<Column key={column.id} lastCol={lastCol} column={column} tasks={tasks} addTask={addTask} taskSearch={search} deleteCol={removeColumn} delete={removeTask} index={index} /> );
                    })}
                    {provided.placeholder}
                    </div>
                    }
                </Droppable>
            </DragDropContext>
            </div>
        </div>
    )
}

export default Board
