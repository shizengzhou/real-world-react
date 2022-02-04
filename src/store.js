import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './reducers/eventsSlice';
import usersReducer from './reducers/usersSlice';
import notificationsReducer from './reducers/notificationsSlice';

export default configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    notifications: notificationsReducer
  }
});
