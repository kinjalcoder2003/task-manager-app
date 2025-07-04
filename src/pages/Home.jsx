import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import KanbanBoard from '../components/KanbanBoard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const isDark = useSelector((state) => state.theme.darkMode);
  const viewMode = useSelector((state) => state.task.viewMode); // ✅ track viewMode

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="container">
      <Header />

      <div className="task-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <TaskForm />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="task-toolbar">
            <SearchBar />
          </div>

          {/* Optional filter bar only in list mode */}
          {viewMode === 'list' && <FilterBar />}

          <div className="task-scrollable">
            {viewMode === 'list' ? <TaskList /> : <KanbanBoard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
