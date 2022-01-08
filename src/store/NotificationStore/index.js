import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

let nextId = 1;

class NotificationStore {
  notifications = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(notification) {
    this.notifications.push({
      ...notification,
      id: nextId++
    });
  }

  remove(notificationToRemove) {
    this.notifications = this.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    );
  }
}

const StoreContext = createContext(new NotificationStore());

const StoreProvider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

const useStore = () => useContext(StoreContext);

export { NotificationStore, StoreProvider, useStore };
