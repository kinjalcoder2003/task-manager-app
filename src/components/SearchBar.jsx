import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSortOption } from '../features/task/taskSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.task.searchTerm);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));

    // Automatically sort if types "title"
    if (value.trim().toLowerCase() === "title") {
      dispatch(setSortOption("title"));
    }
  };

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search tasks..."
      onChange={handleChange}
      className="search-input"
    />
  );
};

export default SearchBar;
