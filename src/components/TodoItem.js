import { BadgeCheckIcon, TrashIcon,LoginIcon } from '@heroicons/react/outline';

const TodoItem = ({tasks,setTasks,active,heading,sort}) => {


    // Handle Delete
    const handleDelete = (task)=>{
        const deleted = tasks.filter((item) => {
              return item.id !== task;
        });
        setTasks(deleted);
        localStorage.setItem("localTasks", JSON.stringify(deleted))
      }

        // Higher-order-function to Handle clicks as handleComplete and handleReverse  

        const handleClicks = (id,status) => {
          const completed = tasks.filter((item) => {
            return item.id  === id;
        })
        completed.map((item) => {
            return item.status = status;
        })
        setTasks(tasks);
        localStorage.setItem("localTasks", JSON.stringify(tasks))
        const comtasks = JSON.parse(localStorage.getItem("localTasks"));
        setTasks(comtasks)
        }
        
        // Handle Complete
        const handleComplete = (id,stat) => {
          handleClicks(id,stat)
        }
        // Handle Reverse
          const handleReverse = (id,stat) => {
            handleClicks(id,stat)
        }

  return (
    <div>
        <h1 className='font-bold text-2xl mb-5'>{heading}</h1>
        {
            active && active?.sort((a, b) => {
              return sort ? a.id  <  b.id ? 1 : -1 : a.id  >  b.id ? 1 : -1
            })
            ?.map((item) =>(
        <main key={item.id} className='w-[300px] lg:w-[400px] bg-blue-900 h-10 flex items-center justify-between m-auto transition-all transform ease-in-out rounded-lg border-[1.5px] border-white hover:scale-x-105 mb-4'>

              <p className='ml-3 font-semibold capitalize'>{item.title}</p>
              <div className='flex flex-row-reverse'>
              <TrashIcon onClick={() => handleDelete(item.id) } className='w-5 h-5 mr-3 text-red-500 cursor-pointer'/>
              { item.status === false ? <BadgeCheckIcon onClick={() => handleComplete(item.id, true) } className='w-5 h-5 mr-3 text-green-500 cursor-pointer'/> : <LoginIcon onClick={() => handleReverse(item.id,false)} className='w-5 h-5 mr-3 text-blue-200 cursor-pointer'/> }
            </div>
        </main>
            ))
        }
      </div>
  )
}

export default TodoItem
