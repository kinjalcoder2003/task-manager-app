import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/task/taskSlice';
import themeReducer from '../features/theme/themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Combine reducers
const rootReducer = combineReducers({
	task: taskReducer,
	theme: themeReducer,
});

// Persisted reducer
const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer);

// Store with middleware (default includes thunk automatically)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
