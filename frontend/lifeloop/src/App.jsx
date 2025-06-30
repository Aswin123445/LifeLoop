import { useState,useEffect } from 'react';
import { Plus } from 'lucide-react';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import TaskCard from './components/taskcard';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompletedTask from './components/completed';
import axios from 'axios';

const API_BASE = 'http://localhost:8000'; 
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [task, settask] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/todos`).then(res => settask(res.data));
  }, []);

  const handleEditStart = (taskId) => {
    setEditingTaskId(taskId); 
    setIsEditing(false);
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTaskId(null);
  }
  const handleEditClick = (editingTaskId) => {
    const taskToEdit = task.find((t) => t.id === editingTaskId);
    setEditingTask(taskToEdit);
  };

  const handleEditStop = () => {
    setEditingTaskId(null);
  };

  const handleMainSubmit = () => {
    setIsEditing(!isEditing);
  }

  const handleComplete = (id) => {
    axios.patch(`${API_BASE}/todos/${id}`, { status: 'completed' }).then(res => {
      settask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: res.data.status } : task
        )       
      );
    }).catch(err => console.error(err));

    // settask((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === id ? { ...task, status: 'completed' } : task
    //   )
    // );
    handleIsEditing();
  };

  const handleUpdateTask = (id, updatedTask) => {
    console.log(updatedTask)
    axios.put(`${API_BASE}/todos/${id}`, updatedTask).then(res => {
      settask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...res.data } : task
        )
      );
    }).catch(err => console.error(err));
    // settask((prevtasks) =>
    //   prevtasks.map((task) =>
    //     task.id === id ? { ...task, ...updatedTask } : task
    //   )
    // );
  };
  const handleDeleteTask = (id) => {
    axios.delete(`${API_BASE}/todos/${id}`).then((value) => {
      if (value.data.status === "success") {
        settask((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error('Failed to delete task');
        return;
      }
    }).catch(err => console.error(err));



    // settask((prevTasks) => prevTasks.filter((task) => task.id !== id));
    // if (editingTaskId === id) {
    //   setEditingTaskId(null);
    //   setIsEditing(false);
    // }
    // handleIsEditing();
  };

  const handleAddTask = (todo) => {
    axios.post(`${API_BASE}/todos`, { 
      id:task.length + 1,
      title:todo,
      priority: 'low',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    }).then(res => {
      console.log(res.data)
      settask((prevTasks) => [...prevTasks, res.data]);
    }).catch(err => console.error(err));

    // const new_task = {
    //   id: task.length + 1,
    //   title: todo,
    //   priority: 'low',
    //   status: 'pending',
    //   date: new Date().toISOString().split('T')[0],
    // };
    // settask([...task, new_task]);
  };

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element = {<div className="flex">
        <main className="ml-56  mt-16 pt-16 flex-cols justify-start w-full h-full min-h-screen">
          <h1 className="text-3xl text-left ml-20 font-semibold text-gray-700 mb-4">Plans</h1>

          <div className="space-y-4">
            {task
              .filter((task) => task.status === 'pending')
              .map((data) => (
                <TaskCard
                  key={data.id}
                  data={data}
                  onComplete={handleComplete}
                  deleteTask={handleDeleteTask}
                  is_editing={data.id === editingTaskId}
                  onEditStart={handleEditStart}
                  onEditStop={handleEditStop}
                  onEdit={handleUpdateTask}
                />
              ))}
          </div>

          {isEditing === false ? (
            <button onClick={handleIsEditing} className="text-start pl-36 pt-2 flex">
              <Plus className="text-blue-700 font-bold" />
              <div className="text-gray-500 hover:text-blue-700">Add tasks</div>
            </button>
          ) : (
            <AddTodoForm onSubmit={handleAddTask} handleCancel={handleCancel} onComplete = {handleMainSubmit} />
          )}
        </main>
      </div>}
      />
      <Route path='/completed' element = {
          <main className="mt-16 pt-16 flex-cols justify-start  min-h-screen h-full ml-52 ">
           <h1 className="text-3xl text-left ml-20 font-semibold text-gray-700 mb-4">Completed Tasks</h1>
           {task.map((data) => (
             data.status === 'completed' ? (
               <CompletedTask
                 key={data.id}
                 text={data.title}
               />
             ) : null
           ))}
         </main>
      }/>
      </Routes>
    </Router>
  );
}

export default App;
