import { makeAutoObservable } from 'mobx';

let nextId = 1;

class NotificationStore {
  notifications = [];

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
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

export default NotificationStore;
