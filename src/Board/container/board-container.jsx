import React,{useState} from 'react'
import Board from '../components/board/Board'
import './board-container.scss'

export default function BoardContainer() {
    const [save, setState] = useState(false)
    const tooglesave =()=>{
        setState(!save)
    }
    return (
        <div className="container">
            <Board save={save} tooglesave={tooglesave}/>
        </div>
    )
}
