import { SquarePen } from "lucide-react";
import { Trash,Check } from 'lucide-react';
import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
const TaskCard = ({  onComplete ,data , update ,is_editing,onEditStart,onEditStop,onEdit}) => {
const [task_completed,set_task_completed] = useState(false);
const onUpdate = () => {
    onEditStart(data.id);
  }
  const onCompleteClick = () => {
    set_task_completed(!task_completed);
    onComplete(data.id);
  }

  return (
    <>
     {is_editing === false ? <div className=" ml-28 rounded shadow-md flex justify-start items-center">
      <div className="relative">
        <button onClick={ onCompleteClick} className="w-3 absolute bottom-1 h-3 m-1 border border-blue-500  ml-2 rounded-full bg-white text-black flex items-center justify-center "></button>
      </div>
     <div className="bg-white  text-start w-4/5 pl-7 flex-cols">
        <div>{data.title}</div> 
        <div className="text-sm pl-2 text-gray">{data.date}</div>
     </div>
     <div className="w-20 flex justify-end items-center ml-24">
        <button onClick={onUpdate}>
            <SquarePen className="w-4 h-4 text-gray-500" />
        </button>
        <button>
         <Trash className="w-4 h-4 text-gray-500 ml-2" />
       </button>
     </div>
    </div> : <AddTodoForm initialData={data} onSubmit={onEdit}   onEditStop={onEditStop}
/>}
    </>
  );
};

export default TaskCard;
