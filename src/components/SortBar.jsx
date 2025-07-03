import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from '../features/task/taskSlice';

const SortBar = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.task.sortOption);

  const handleChange = (e) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <select value={sortOption} onChange={handleChange} className="sort-select">
      <option value="none">Sort: None</option>
      <option value="title">Sort: Title (A-Z)</option>
      <option value="dueDate">Sort: Due Date (Earliest)</option>
      <option value="status">Sort: Status</option>
    </select>
  );
};

export default SortBar;
