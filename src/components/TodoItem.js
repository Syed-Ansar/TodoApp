import { BadgeCheckIcon, TrashIcon } from '@heroicons/react/outline';

const TodoItem = ({tasks,setTasks,active,heading}) => {

    // Handle Delete
    const handleDelete = (task)=>{
        const deleted = tasks.filter((item) => {
              return item.id !== task;
        });
        setTasks(deleted);
        localStorage.setItem("localTasks", JSON.stringify(deleted))
      }

    // Handle Complete  
 
        const handleComplete = (complete) => {
            const completed = tasks.filter((item) => {
                return item.id  === complete;
            })
          completed.map((item) => {
                return item.status = true;
            })
            setTasks(tasks)
            localStorage.setItem("localTasks", JSON.stringify(tasks))
            window.location.reload();
        }
    


  return (
    <div>
        <h1 className='font-bold text-2xl mb-5'>{heading}</h1>
        
        {
            active && active?.sort((a, b) => {
              return a.id < b.id ? 1 : -1
            })
            ?.map((item) =>(
              <main key={item.id} className='w-[300px] lg:w-[400px] bg-blue-900 h-10 flex items-center justify-between m-auto transition-all transform ease-in-out rounded-lg border-[1.5px] border-white hover:scale-x-105 mb-4'>
            <p className='ml-3 font-semibold capitalize'>{item.title}</p>
            <div className='flex flex-row-reverse'>
            <TrashIcon onClick={() => handleDelete(item.id) } className='w-5 h-5 mr-3 text-red-500 cursor-pointer'/>
            <BadgeCheckIcon onClick={() => handleComplete(item.id) } className='w-5 h-5 mr-3 text-green-500 cursor-pointer'/>
            </div>
          </main>
            ))
        }
    </div>
  )
}

export default TodoItem