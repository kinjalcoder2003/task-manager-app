import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	tasks: [
		{
			id: 'demo-task-1',
			title: 'Sample Task',
			description: 'This is a demo task. You can edit or delete it.',
			status: 'Pending',
			dueDate: null,
		},
	],
	filter: 'All',
	searchTerm: '',
	viewMode: 'list',
	sortOption: 'none',
};

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.tasks.push({
				id: nanoid(),
				title: action.payload.title,
				description: action.payload.description,
				status: 'Pending',
				dueDate: action.payload.dueDate || null,
			});
		},
		editTask: (state, action) => {
			const task = state.tasks.find((t) => t.id === action.payload.id);
			if (task) {
				task.title = action.payload.title;
				task.description = action.payload.description;
				task.dueDate = action.payload.dueDate;
			}
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter((t) => t.id !== action.payload);
		},
		toggleTaskStatus: (state, action) => {
			const task = state.tasks.find((t) => t.id === action.payload);
			if (task) {
				if (task.status === 'Pending') task.status = 'In Progress';
				else if (task.status === 'In Progress') task.status = 'Completed';
				else task.status = 'Pending';
			}
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		reorderTasks: (state, action) => {
			const { sourceIndex, destinationIndex } = action.payload;
			const reordered = [...state.tasks];
			const [movedTask] = reordered.splice(sourceIndex, 1);
			reordered.splice(destinationIndex, 0, movedTask);
			state.tasks = reordered;
		},
		setViewMode: (state, action) => {
			state.viewMode = action.payload;
		},
		replaceAllTasks: (state, action) => {
			state.tasks = action.payload;
		},
		setSortOption: (state, action) => {
			state.sortOption = action.payload;
		},
	},
});

export const {
	addTask,
	editTask,
	deleteTask,
	toggleTaskStatus,
	setFilter,
	setSearchTerm,
	reorderTasks,
	setViewMode,
	replaceAllTasks,
	setSortOption,
} = taskSlice.actions;

export default taskSlice.reducer;
