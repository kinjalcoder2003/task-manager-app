import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/task/taskSlice';

const ViewToggle = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.task.viewMode);

  return (
    <div>
      <button
        onClick={() => dispatch(setViewMode('list'))}
        className={viewMode === 'list' ? 'filter-btn' : 'filter-btn active'}
      >
        List View
      </button>
      <button
        onClick={() => dispatch(setViewMode('kanban'))}
        className={viewMode === 'kanban' ? 'filter-btn' : 'filter-btn active'}
        style={{ marginLeft: '1rem' }}
      >
        Kanban View
      </button>
    </div>
  );
};

export default ViewToggle;
