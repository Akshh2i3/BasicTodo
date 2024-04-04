'use client'
import React, { useContext, useState } from 'react'
import { MyContext } from '@/Storage/Context';
import { IoIosSave } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";



const TaskField = ({ todo }) => {
    const { updateTodo, deleteTodo, markUnmark } = useContext(MyContext)
    // console.log(todo.id)
    const { id } = todo
    console.log(id)
    const [newmsg, setNewmsg] = useState(todo.todotitle)
    const [newstatus, setNewstatus] = useState(todo.completed)
    const [isEditable, setIsEditable] = useState(false)

    const toggle = () => {
        markUnmark(id)
        setNewstatus(!newstatus)
    }

    const edit = () => {
        if (isEditable === true) {
            updateTodo(id, newmsg)
        }

        setIsEditable(!isEditable)
    }

    return (
        <div className={`pl-5 pr-3 py-2 text-xl flex gap-4 rounded-2xl duration-300
                        ${newstatus ? 'bg-green-200' : 'bg-violet-200'}`}>
            <input
                type='checkbox'
                checked={newstatus}
                onChange={toggle}
                disabled={isEditable}
            />
            <input
                type='text'
                className={`text-xl w-full mb-1 border outline-none rounded-lg bg-transparent text-gray-600 
                ${newstatus && 'line-through'} 
                ${isEditable ? 'border-gray-400 px-2' : 'border-transparent'}`}
                value={newmsg}
                onChange={(e) => setNewmsg(e.target.value)}
                readOnly={!isEditable}
            />

            <button
                className='bg-white px-2 py-1 rounded-lg'
                onClick={edit}
                disabled={newstatus}
            >
                {isEditable
                    ? <IoIosSave color='blue' />
                    : <FaPencil color='green' />}
            </button>
            <button
                onClick={() => deleteTodo(id)}
                className='bg-white px-2 py-1 rounded-lg'
            ><GiCancel color='red' /></button>
        </div>
    )
}

export default TaskField