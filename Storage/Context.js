'use client'
import React, { createContext, useContext } from 'react'

export const MyContext = createContext({
    allTodos: [
        //this is how data will look like, array of object
        // {
        //     id: 0,
        //     todotitle: 'todo msg',
        //     completed: false,
        // }
    ],
    addTodo: (todotitle) => { },
    updateTodo: (id, todotitle) => { },
    deleteTodo: (id) => { },
    markUnmark: (id) => { },
});

// after removing this and using them normaly, everthing works fine mabye next js does not support this things

// export const useTodo = () => {
//     useContext(MyContext)
// }

// export const TodoProvider = MyContext.Provider