import { PlusCircleIcon,RefreshIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import Todo from './Todo';


const Todos = () => {

      const [task, setTask] = useState("");
      const [tasks, setTasks] = useState([]);

      // Handling Input
      const handleInput = (e) => {
          setTask(e.target.value)
      }

      useEffect(()=>{
          if(localStorage.getItem("localTasks")){
          const storedList = JSON.parse(localStorage.getItem("localTasks"));
          setTasks(storedList);
    }
},[])

  // Adding task to localStorage
      const addTask = (e) => {
          e.preventDefault();
          if (task) {
          const newTask = { id: new Date().getTime().toString(), title: task,status: false };
          setTasks([...tasks, newTask]);
          localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
          setTask("");
        }
    };

  // Resting or Clearing localstorage Data.
        const handleClear=() => {
        setTasks([]);
        localStorage.removeItem("localTasks");
      }

  return (
    <div className="text-center">
        <header className="m-10">
          <h1 className='font-bold text-4xl'>Todo App</h1>
        </header>
        <div className='flex flex-col md:flex-row justify-center items-center'>
        <form onSubmit={(e) => addTask(e) } className='h-[100px] flex items-center justify-center'>
          <div>
          <input placeholder='Enter todo...' value={task} onChange={(e) => handleInput(e)} type="text" className='w-[250px] md:w-[450px] h-10 rounded-md font-medium outline-white bg-blue-900 pl-4 placeholder:text-sm placeholder:text-gray-300' />
          <li className='hidden text-blue-300 md:flex text-[8px] font-semibold mt-1.5 ml-2 justify-start'>Press enter to submit Todo.</li>
          </div>
          <button className='md:hidden'>
          <PlusCircleIcon className='h-10 w-10 p-2 bg-gray-800 text-white ml-2 rounded-md'/>
          </button>
        </form>
        <div className=''>
          <h1 onClick={ () => handleClear()} className='h-10 bg-gray-800 ml-2 rounded-md cursor-pointer mb-6 font-bold mt-1 w-32 flex flex-row items-center justify-center'>
          <p>Reset</p>
          <RefreshIcon className='h-5 w-5 ml-2 text-red-600'/>
          </h1>
        </div>
        </div>
          <div className='flex flex-col md:flex-row w-full justify-center'>
          <Todo tasks={tasks} setTasks={setTasks}/>
          </div>
    </div>
  );
}

export default Todos
