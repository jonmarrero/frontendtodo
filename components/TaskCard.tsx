import React from 'react';
import { Task } from '@prisma/client';

type TaskCardProps = {
  task: Task;
  toggleCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, toggleCompletion, deleteTask }) => (
  <div className="flex justify-between items-center p-4 border rounded shadow-md">
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task.id)}
        className="form-checkbox"
      />
      <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
    </div>
    <button
      onClick={() => deleteTask(task.id)}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  </div>
);

export default TaskCard;
