import React, { useState } from 'react';

type TaskFormProps = {
  onSave: (title: string, color: string) => void;
  initialTitle?: string;
  initialColor?: string;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSave, initialTitle = '', initialColor = 'red' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title) onSave(title, color);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="p-2 border rounded w-full"
        required
      />
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
