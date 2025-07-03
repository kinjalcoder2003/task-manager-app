
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../features/task/taskSlice';

// const FilterBar = () => {
//   const dispatch = useDispatch();
//   const currentFilter = useSelector((state) => state.task.filter);

//   const filters = ['All', 'Pending', 'In Progress', 'Completed'];

//   return (
//     <div className="filter-bar">
//       {filters.map((status) => (
//         <button
//           key={status}
//           className={`filter-btn ${currentFilter === status ? 'active' : ''}`}
//           onClick={() => dispatch(setFilter(status))}
//         >
//           {status}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default FilterBar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/task/taskSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.task.filter);
  const tasks = useSelector((state) => state.task.tasks);

  // Count by status
  const total = tasks.length;
  const pending = tasks.filter(task => task.status === 'Pending').length;
  const inProgress = tasks.filter(task => task.status === 'In Progress').length;
  const completed = tasks.filter(task => task.status === 'Completed').length;

  // Mapping filter names to counts
  const filters = [
    { name: 'All', count: total },
    { name: 'Pending', count: pending },
    { name: 'In Progress', count: inProgress },
    { name: 'Completed', count: completed }
  ];

  return (
    <div className="filter-bar">
      {filters.map(({ name, count }) => (
        <button
          key={name}
          className={`filter-btn ${currentFilter === name ? 'active' : ''}`}
          onClick={() => dispatch(setFilter(name))}
        >
          {name} ({count})
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
