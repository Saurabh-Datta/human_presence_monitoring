import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../redux/rooms/roomsReducer';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});
