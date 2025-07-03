// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import Header from '../components/Header';
// import TaskForm from '../components/TaskForm';
// import FilterBar from '../components/FilterBar';
// import TaskList from '../components/TaskList';
// import TaskStats from '../components/TaskStats';
// import SearchBar from '../components/SearchBar';
// import ViewToggle from '../components/ViewToggle';
// import KanbanBoard from '../components/KanbanBoard';

// const Home = () => {
//   const isDark = useSelector((state) => state.theme.darkMode);
//   const viewMode = useSelector((state) => state.task.viewMode);

//   useEffect(() => {
//     document.body.classList.toggle('dark', isDark);
//   }, [isDark]);

//   return (
//     <div className="container">
//       <Header />
//       <div className="task-layout">
//         {/* Fixed Left Form Panel */}
//         <div className="left-panel">
//           <TaskForm />
//         </div>

//         {/* Right Side Content */}
//         <div className="right-panel">
//           {/* Sticky Controls */}
//           <div className="task-toolbar">
//             <ViewToggle />
//             <SearchBar />
//             {viewMode === 'list' && <FilterBar />}
//           </div>

//           {/* Scrollable Content Area */}
//           <div className="task-scrollable">
//             {viewMode === 'list' ? <TaskList /> : <KanbanBoard />}
//             <TaskStats />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// // import React, { useEffect } from 'react';
// // import { useSelector } from 'react-redux';

// // import Header from '../components/Header';
// // import TaskForm from '../components/TaskForm';
// // import FilterBar from '../components/FilterBar';
// // import TaskList from '../components/TaskList';
// // import TaskStats from '../components/TaskStats';
// // import SearchBar from '../components/SearchBar';
// // import ViewToggle from '../components/ViewToggle';
// // import KanbanBoard from '../components/KanbanBoard';
// // import SortBar from '../components/SortBar';

// // const Home = () => {
// //   const isDark = useSelector((state) => state.theme.darkMode);
// //   const viewMode = useSelector((state) => state.task.viewMode);

// //   useEffect(() => {
// //     document.body.classList.toggle('dark', isDark);
// //   }, [isDark]);

// //   return (
// //     <div className="home-container">
// //       <Header />
// //       <div className="add-task-wrapper">
// //         <TaskForm />
// //       </div>

// //       <div className="toolbar-row">
// //         <ViewToggle />
// //         <SearchBar />
// //         <SortBar />
// //       </div>

// //       <TaskStats />

// //       {viewMode === 'list' && <FilterBar />}

// //       <div className="task-view">
// //         {viewMode === 'list' ? <TaskList /> : <KanbanBoard />}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const isDark = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="container">
      <Header />

      <div className="task-layout">
        {/* Left Panel - Add Task Form */}
        <div className="left-panel">
          <TaskForm />
        </div>

        {/* Right Panel - All Content */}
        <div className="right-panel">
          <div className="task-toolbar">
            <SearchBar />
            {/* <div className='line'></div> */}
          </div>

          <div className="task-scrollable">
            <div className="filter-stats-row">
              <FilterBar />
            </div>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
