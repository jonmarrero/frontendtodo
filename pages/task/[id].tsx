import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../components/TaskForm';
import axios from 'axios';

const TaskPage = () => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks/${id}`).then((res) => setTask(res.data));
    }
  }, [id]);

  const handleSave = async (title: string, color: string) => {
    if (id) {
      await axios.put(`http://localhost:5000/tasks/${id}`, { title, color });
    } else {
      await axios.post('http://localhost:5000/tasks', { title, color });
    }
    router.push('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{id ? 'Edit Task' : 'Create Task'}</h1>
      <TaskForm onSave={handleSave} initialTitle={task?.title} initialColor={task?.color} />
    </div>
  );
};

export default TaskPage;
