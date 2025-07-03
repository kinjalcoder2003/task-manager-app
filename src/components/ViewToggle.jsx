import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/task/taskSlice';

const ViewToggle = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.task.viewMode);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => dispatch(setViewMode('list'))}
        className={viewMode === 'list' ? 'filter-btn active' : 'filter-btn'}
      >
        List View
      </button>
      <button
        onClick={() => dispatch(setViewMode('kanban'))}
        className={viewMode === 'kanban' ? 'filter-btn active' : 'filter-btn'}
        style={{ marginLeft: '1rem' }}
      >
        Kanban View
      </button>
    </div>
  );
};

export default ViewToggle;
