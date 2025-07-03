import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../features/task/taskSlice';
import { toast } from 'react-toastify';

const EditTaskModal = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required!');
      return;
    }

    dispatch(editTask({ id: task.id, title, description, dueDate }));
    toast.success('Task updated!');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit">Update Task</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
