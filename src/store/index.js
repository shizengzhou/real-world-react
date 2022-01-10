import { createContext } from 'react';
import EventStore from './EventStore';
import NotificationStore from './NotificationStore';

class RootStore {
  constructor() {
    this.notificationStore = new NotificationStore(this);
    this.eventStore = new EventStore(this);
  }
}

const StoreContext = createContext();

export { RootStore, StoreContext };
