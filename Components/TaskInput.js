'use client'
import { MyContext } from '@/Storage/Context'
import React, { useContext, useState } from 'react'

const TaskInput = () => {
    const [task, setTask] = useState('')
    const { addTodo } = useContext(MyContext)

    const add = (e) => {
        e.preventDefault()

        if (task === '') return

        addTodo(task)
        setTask('')
    }
    return (
        <>
            <input
                className='w-full p-3 bg-white/30 text-white outline-none rounded-l-2xl'
                type='text'
                placeholder='Write Todo...'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button
                onClick={add}
                className='bg-green-600 text-xl text-white rounded-r-2xl px-5 py-2 '>
                Add
            </button>
        </>
    )
}

export default TaskInput