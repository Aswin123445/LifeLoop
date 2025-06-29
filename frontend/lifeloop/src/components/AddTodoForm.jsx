import { useState, useEffect } from 'react';
import { CalendarClock,ArrowBigDownDash  } from 'lucide-react';
const AddTodoForm = ({ onSubmit ,initialData = null ,onEditStop = null}) => { 
  const [task, setTask] = useState('');
  useEffect(() => {
    if (initialData) {
      setTask(initialData.title);
    }
  }, [initialData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return; 
    if (initialData){
       onSubmit(initialData.id, {...initialData, title: task });
       onEditStop();
    }else{
        onSubmit(task);

    }
    setTask('');
  };

  return (
    <div className='flex-cols border  rounded-md ml-28 min-h-32 mr-6  mt-4'>
        <form onSubmit={handleSubmit}>
           <div className=''>
              <div className="flex items-center space-x-4 ">
                <input
                   type="text"
                   value={task}
                   onChange={(e) => setTask(e.target.value)}
                   placeholder={initialData ? "Update your task..." : "Review Tomorrow have wake up morning"}
                   className="border placeholder:font-semibold placeholder:text-black h-10 border-none outline-none rounded px-4 py-2 w-full"
                />
               </div>
           </div>
        <div className='flex justify-between'>
            <div className='flex justify-start h-5  ml-6'>
                <div className='bg-gray-200 justify-center flex text-sm  rounded-md w-16  mr-2 hover:bg-gray-300'>
                    <div className='text-gray-500'>date</div>
                    <CalendarClock className='pt-1 text-gray-500' size={17}/>
                </div>
                <div className='bg-gray-200 justify-center flex text-sm  rounded-md w-16  mr-2 hover:bg-gray-300'>
                    <div className='text-gray-500'>priority</div>
                    <ArrowBigDownDash className='pt-1 text-gray-500' size={17}/>
                </div>
            </div>
            <div className='ml-2 flex justify-start  mt-4 w-48'>
                <div >
                    <div className='bg-gray-200 mt-3 h-8  text-xl w-20 text-red-500 font-semibold hover:bg-gray-300 rounded-md mr-4'>cancel</div>
                </div>
                  <div >
                    <button type='submit' className='bg-gray-200 mt-3 h-8 text-xl w-20 text-blue-500 font-semibold hover:bg-gray-300 rounded-md mr-4'>
                      {initialData ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    </form>

    </div>
  );
};

export default AddTodoForm;
