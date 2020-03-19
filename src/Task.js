import React from 'react'
import './Task.css';

export default (props) => {

    const { task, editTask, deleteTask } = props
    const { id, name } = task

    return (
        <li >
            <div className='id'>
                {id}
            </div>
            <div className='name'>
                {name}
            </div>
            <div className='container'>
                <button className='btn1' onClick={() => deleteTask(id)}>Delete</button>
                <button className='btn2' onClick={() => editTask(id)}>Edit</button>
            </div>
        </li>
    )
}

