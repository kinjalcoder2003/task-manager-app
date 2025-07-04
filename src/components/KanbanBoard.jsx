import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KanbanTaskCard from "./KanbanTaskCard";
import { replaceAllTasks } from "../features/task/taskSlice";
import EditTaskModal from './EditTaskModal';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const [editingTask, setEditingTask] = useState(null);

  const statuses = ["Pending", "In Progress", "Completed"];

  // Group tasks by status
  const grouped = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    // Drag within same column — reorder
    if (sourceStatus === destStatus) {
      const tasksInColumn = [...grouped[sourceStatus]];
      const [moved] = tasksInColumn.splice(source.index, 1);
      tasksInColumn.splice(destination.index, 0, moved);

      // Merge reordered tasks back with others
      const reorderedTasks = tasks
        .filter((t) => t.status !== sourceStatus)
        .concat(tasksInColumn);

      dispatch(replaceAllTasks(reorderedTasks));
    }
    // Drag between different columns — update status
    else {
      const taskToMove = grouped[sourceStatus][source.index];
      const updatedTask = { ...taskToMove, status: destStatus };

      const newTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      dispatch(replaceAllTasks(newTasks));
    }
  };
  const handleEdit = (task) => {
    setEditingTask(task);
  };
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        <div className="kanban-header">
          {statuses.map((status) => (
            <div
              key={status}
              className={`kanban-header-cell ${status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {status}
            </div>
          ))}
        </div>

        <div className="kanban-columns">
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {[...grouped[status]]
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? "dragging" : ""}
                          >
                            <KanbanTaskCard task={task} onEdit={handleEdit} />
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
          {editingTask && (
        <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </>
  );
};

export default KanbanBoard;
