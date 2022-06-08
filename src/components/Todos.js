import { useEffect, useState } from 'react';
import { BadgeCheckIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'


const Todos = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // console.log(tasks.id);

  const handleInput = (e) => {
    setTask(e.target.value)
  }

  useEffect(()=>{
    if(localStorage.getItem("localTasks")){
        const storedList = JSON.parse(localStorage.getItem("localTasks"));
        setTasks(storedList);
    }
},[])

  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };


  

  const handleDelete = (task)=>{
    const deleted = tasks.filter((t)=>t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted))
  }

  const handleClear=()=>{
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
        <input placeholder='Enter todo...' value={task} onChange={(e) => handleInput(e)} type="text" className='w-[250px] md:w-[450px] h-10 rounded-md font-medium bg-blue-900 pl-4 placeholder:text-sm placeholder:text-gray-300' />
        <li className='text-blue-300 flex text-[10px] font-semibold mt-1 ml-2 justify-start'>Enter to submit Todo.</li>
        </div>
        <button className='md:hidden'>
          <PlusCircleIcon className='h-10 w-10 p-2 bg-gray-800 text-white ml-2 rounded-md -mt-[20px]'/>
        </button>
      </form>
      <div>
        <h1 onClick={ () => handleClear()} className='h-10 p-2 bg-gray-800 ml-2 rounded-md cursor-pointer mb-6 font-bold text-red-600 mt-1'>Reset</h1>
      </div>
      </div>
      <div className='flex flex-col md:flex-row w-full justify-center'>

        {/* Todo */}
        <div>
        {
            tasks && tasks?.map((item) =>(
              <div key={item.id}>
              <main className='w-[300px] md:w-[400px] bg-blue-900 h-10 flex items-center justify-between m-auto transition-all transform ease-in-out rounded-lg border-[1.5px] border-white hover:scale-x-105 mb-4'>
            <p className='ml-3 font-semibold capitalize'>{item.title}</p>
            <div className='flex flex-row-reverse'>
            <TrashIcon onClick={() => handleDelete(item.id) } className='w-5 h-5 mr-3 text-red-500 cursor-pointer'/>
            <BadgeCheckIcon className='w-5 h-5 mr-3 text-green-500 cursor-pointer'/>
            </div>
        </main>
              </div>
            ))
        }
    </div>
      </div>
    </div>
  );
}

export default Todos
