import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import TodoItem from './TodoItem';


const Todo = ({tasks,setTasks}) => {

          const [activeTasks,setActiveTasks] = useState([]);
          const [completeTasks,setCompleteTasks] = useState([]);

      
      useEffect(() => {
          const active = tasks.filter((item) => {
            return item.status === false;
          })
          const completedTasks = tasks.filter((item) => {
            return item.status === true;
          })
          setActiveTasks(active);
          setCompleteTasks(completedTasks);
        }, [tasks])
        


  return (
        <div className='flex flex-col md:flex-row mt-10'>
          <div className='flex flex-col'>

        <TodoItem heading={'Active Todos'} active={activeTasks} tasks={tasks} setTasks={setTasks} sort={'<'} />
        { activeTasks.length === 0 && <h1 className='font-semibold text-xs mb-3 text-red-500 md:w-[200px] m-auto'>Create Your Tasks</h1>}

          </div>
          <hr className='w-[60%] mx-auto my-10 md:hidden' />
          <div className='flex flex-col md:ml-32'>

        <TodoItem heading={'Completed Todos'} active={completeTasks} tasks={tasks} setTasks={setTasks} />
        { completeTasks.length === 0 && <h1 className='font-semibold text-xs mb-3 text-green-500 w-[180px] mx-auto'>The key is in not spending time, but in investing it.</h1>}

          </div>
    </div>
  )
}

export default Todo
