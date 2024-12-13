import axios from 'axios';
import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import Link from 'next/link';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then((res) => setTasks(res.data));
  }, []);

  const toggleCompletion = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }
  };

  const deleteTask = async (id: number) => {
    if (confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task List</h1>
      <Link href="/create">
        <button className="mb-4 p-2 bg-green-500 text-white rounded">Create Task</button>
      </Link>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            toggleCompletion={toggleCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
