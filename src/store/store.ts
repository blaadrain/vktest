import { configureStore } from '@reduxjs/toolkit';
import groups from './slices/groups-slice';

export const store = configureStore({ reducer: { groups } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
