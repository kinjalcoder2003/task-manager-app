import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { replaceAllTasks } from '../features/task/taskSlice';

const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const grouped = statuses.reduce((acc, status) => {
    acc[status] =
      status === 'All' ? tasks : tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Prevent dragging from or to "All"
    if (
      source.droppableId === 'All' ||
      destination.droppableId === 'All'
    )
      return;

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
      <div className="kanban-board">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status} isDropDisabled={status === 'All'}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{status}</h3>
                {grouped[status].map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    isDragDisabled={status === 'All'} // Optional: disable drag in All
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard task={task} />
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
    </DragDropContext>
  );
};

export default KanbanBoard;
