import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/task/taskSlice';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }

    dispatch(addTask({ title, description, dueDate }));
    toast.success("Task added successfully!");
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className='title'>Add New Task</h2>
      <div className='line'></div>
      
      <input
        type="text"
        placeholder="Task Title "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
