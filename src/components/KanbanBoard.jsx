import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { replaceAllTasks } from '../features/task/taskSlice';
import KanbanTaskCard from './kanbanTaskCard';

const statuses = ['Pending', 'In Progress', 'Completed'];

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const grouped = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceList = grouped[source.droppableId];
      const movedTask = { ...sourceList[source.index] };
      movedTask.status = destination.droppableId;
      const newTasks = tasks.map((t) =>
        t.id === movedTask.id ? movedTask : t
      );
      dispatch(replaceAllTasks(newTasks));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {/* Header */}
        <div className="kanban-header">
          {statuses.map((status) => (
            <div key={status} className={`kanban-header-cell ${status.toLowerCase().replace(" ", "-")}`}>
              {status}
            </div>
          ))}
        </div>

        {/* Columns */}
        <div className="kanban-columns">
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="kanban-column"
                >
                  {grouped[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanTaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
