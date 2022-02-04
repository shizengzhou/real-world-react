import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification(state, action) {
      state.push({
        ...action.payload,
        id: nextId++
      });
    },
    removeNotification(state, action) {
      // state = state.filter(
      //   notification => notification.id !== action.payload.id
      // );
      const index = state.findIndex(
        notification => notification.id === action.payload.id
      );
      state.splice(index, 1);
    }
  }
});

export const {
  addNotification,
  removeNotification,
} = notificationsSlice.actions

export default notificationsSlice.reducer;

export const selectAllNotifications = state => state.notifications;
