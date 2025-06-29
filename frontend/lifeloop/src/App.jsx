import { useState } from 'react';
import { Plus } from 'lucide-react';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import TaskCard from './components/taskcard';
import AddTodoForm from './components/AddTodoForm';

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
    console.log('task updated');
    console.log(task);
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
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="ml-56 mt-16 pt-16 flex-cols justify-start w-full h-full min-h-screen">
          <h1 className="text-3xl text-left ml-20 font-bold mb-4">Plans</h1>

          <div className="space-y-4">
            {task
              .filter((task) => task.status === 'pending')
              .map((data) => (
                <TaskCard
                  key={data.id}
                  data={data}
                  onComplete={handleComplete}
                  update={handleUpdateTask}
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
            <AddTodoForm onSubmit={handleAddTask} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
