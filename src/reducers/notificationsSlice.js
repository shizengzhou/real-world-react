import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const notificationAdapter = createEntityAdapter();

const initialState = notificationAdapter.getInitialState();

let nextId = 1;

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      notificationAdapter.addOne(state, { ...action.payload, id: nextId++ })
    },
    removeNotification(state, action) {
      // state = state.filter(
      //   notification => notification.id !== action.payload.id
      // );
      notificationAdapter.removeOne(state, action.payload.id)
    }
  }
});

export const {
  addNotification,
  removeNotification,
} = notificationsSlice.actions

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications
} = notificationAdapter.getSelectors(state => state.notifications)
