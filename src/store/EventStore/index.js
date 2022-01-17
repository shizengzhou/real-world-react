import { makeAutoObservable } from 'mobx';
import NProgress from 'nprogress';
import EventService from '../../services/EventService';

class EventStore {
  events = [];
  eventsTotal = 0;
  event = null;
  perPage = 3;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  addEvent(event) {
    this.events.push(event);
  }

  setEvents(events) {
    this.events = events;
  }

  setEventsTotal(eventsTotal) {
    this.eventsTotal = eventsTotal;
  }

  setEvent(event) {
    this.event = event;
  }

  fetchEvents(page) {
    EventService.getEvents(this.perPage, page)
      .then(res => {
        this.setEvents(res.data);
        this.setEventsTotal(res.headers['x-total-count']);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        };
        this.rootStore.notificationStore.add(notification);
        NProgress.done();
      });
  }

  fetchEvent(id) {
    return new Promise((resolve, reject) => {
      if (this.event && this.event.id === Number(id)) {
        return resolve(this.event);
      }

      const event = this.events.find(e => e.id === Number(id));
      if (event) {
        this.setEvent(event);
        return resolve(event);
      }
      return EventService.getEvent(id)
        .then(res => {
          this.setEvent(res.data);
          return resolve(res.data);
        })
        .catch(error => {
          reject(error);
          NProgress.done();
        });
    });
  }

  createEvent(event) {
    return EventService.postEvent(event)
      .then(() => {
        this.addEvent(event);
        this.setEvent(event);
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        };
        this.rootStore.notificationStore.add(notification);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        };
        this.rootStore.notificationStore.add(notification);
        throw error;
      });
  }
}

export default EventStore;
