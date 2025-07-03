import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../features/task/taskSlice';
import { toast } from 'react-toastify';


const KanbanTaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.info("Task deleted");
  };

  const handleStatusChange = () => {
    dispatch(toggleTaskStatus(task.id));
    toast.success(`Marked as ${getNextStatus(task.status)}`);
  };

  const getNextStatus = (status) => {
    if (status === 'Pending') return 'In Progress';
    if (status === 'In Progress') return 'Completed';
    return 'Pending';
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`kanban-task-card ${task.status.toLowerCase().replace(" ", "-")} ${
        isOverdue && task.status !== "Completed" ? 'overdue' : ''
      }`}
    >
      <h3 className="title">{task.title}</h3>
      <p className="desc">{task.description}</p>

      {task.dueDate && (
        <p className="duedate">
          <strong>Due:</strong> {task.dueDate}
        </p>
      )}

      <p className="status">
        <strong>Status:</strong> {task.status}
      </p>

      <div className="kanban-task-actions">
        <button onClick={handleStatusChange}>Next</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => onEdit(task)}>Edit</button>
      </div>
    </div>
  );
};

export default KanbanTaskCard;
