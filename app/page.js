// speciality of this todo list is this once items are added they can be edited
// and even if we refresh the data is not lost we will keep it in local storage
'use client'
import React, { useEffect, useState } from 'react'
import { MyContext } from '@/Storage/Context'
import TaskInput from '@/Components/TaskInput'
import TaskField from '@/Components/TaskField'

const page = () => {
  const [allTodos, setallTodos] = useState([]);
  // const [cntr, setCntr] = useState(0);

  const addTodo = (todo) => {
    setallTodos([{ id: Date.now(), todotitle: todo, completed: false }, ...allTodos])

    // only works if id are sorted
    // setallTodos([...allTodos, { id: cntr, todotitle: todo, completed: false }])
    // setCntr(cntr + 1)
  }

  // it is only possible to directly access id as idx because we are assigning id in an order otherwise we had to use map on all previous value of alltodos and compare each id to fullfill condition 
  const updateTodo = (id, todo) => {
    setallTodos(
      allTodos.map((eachtodo) =>
        eachtodo.id === id
          ? { ...eachtodo, todotitle: todo }
          : eachtodo
      )
    )


    // only works if id are sorted
    // let copy = allTodos
    // copy[id].todotitle = todo
    // setallTodos(copy)
  }

  const deleteTodo = (id) => {
    setallTodos(
      allTodos.filter((eachtodo) => eachtodo.id !== id)
    )
    // correct logic but some issue in rendering dont know
    // let copy = allTodos
    // copy.splice(id, 1)

    // for (let i = id; i < copy.length; i++) {
    //   copy[i].id = copy[i].id - 1;
    // }

    // setCntr(cntr - 1)
    // setallTodos(copy)
  }

  const markUnmark = (id) => {
    setallTodos(
      allTodos.map((eachtodo) =>
        eachtodo.id === id
          ? { ...eachtodo, completed: !eachtodo.completed }
          : eachtodo
      )
    )
    // only works if ids are sorted
    // let copy = allTodos
    // copy[id].completed = !copy[id].completed
    // setallTodos(copy)
  }

  // we will keep all our data in local storage so that even after refreshing the page our data will not be lost
  // localStorage is only accessible at client side, there is no localStorage at server side
  // localStorage returns and accepts values in string format but we have and want values in JSON so dont forget to convert values 
  useEffect(() => {
    const Data = JSON.parse(localStorage.getItem('Data'))

    // if data is absent and we try to access it without knowning then site may crash
    // if data is present and its empty then no need to access
    if (Data && Data.length > 0) {
      setallTodos(Data)   // accepted previous data into setallTodes 
    }
  }, []);
  // it has no dependencies it will it will run everytime the page will reload

  // we can also use multiple useEffects with different different dependency
  // we also want to update data in localStorage as there is any change in allTodos array
  useEffect(() => {
    localStorage.setItem('Data', JSON.stringify(allTodos))
  }, [allTodos])



  return (
    <MyContext.Provider value={{ allTodos, addTodo, updateTodo, deleteTodo, markUnmark }}>

      <div className='w-full min-h-screen bg-red-500'>
        <div className='text-white text-center text-3xl font-bold pt-16'>Manage Your Todos</div>
        <div className='w-1/3 mt-10 mx-auto flex'>
          <TaskInput />
        </div>
        <div>
          <ul className='w-1/3 mt-10 mx-auto flex flex-col flex-wrap gap-5'>
            {
              allTodos.map((todo) => (
                <li key={todo.id}>
                  <TaskField todo={todo} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    </MyContext.Provider >
  )
}

export default page