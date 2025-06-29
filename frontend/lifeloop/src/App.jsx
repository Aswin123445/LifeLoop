import { useState } from 'react';
import { Plus } from 'lucide-react';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import TaskCard from './components/taskcard';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompletedTask from './components/completed';
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [task, settask] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleEditStart = (taskId) => {
    setEditingTaskId(taskId);
    handleIsEditing();
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
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

  const handleComplete = (id) => {
    settask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    );
    handleIsEditing();
  };

  const handleUpdateTask = (id, updatedTask) => {
    settask((prevtasks) =>
      prevtasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  const handleDeleteTask = (id) => {
    settask((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setIsEditing(false);
    }
    handleIsEditing();
  };

  const handleAddTask = (todo) => {
    const new_task = {
      id: task.length + 1,
      title: todo,
      priority: 'low',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    settask([...task, new_task]);
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
            <AddTodoForm onSubmit={handleAddTask} handleCancel={handleCancel} />
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
