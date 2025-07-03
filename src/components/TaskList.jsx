import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTasks } from '../features/task/taskSlice';
import EditTaskModal from './EditTaskModal';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const filter = useSelector((state) => state.task.filter);
  const searchTerm = useSelector((state) => state.task.searchTerm.toLowerCase());
  const sortOption = useSelector((state) => state.task.sortOption); // ✅ new

  const [editingTask, setEditingTask] = useState(null);

  //  Filter tasks
  let filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm) ||
      (task.description || '').toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  //  Sort tasks
  if (sortOption === 'title') {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'dueDate') {
    filteredTasks.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
  } else if (sortOption === 'status') {
    const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Completed': 3 };
    filteredTasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  if (filteredTasks.length === 0) {
    return <p>No tasks found for "{filter}"</p>;
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div
              className="task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} onEdit={handleEdit} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingTask && (
        <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </>
  );
};

export default TaskList;
