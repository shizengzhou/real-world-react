import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import EventService from '../../services/EventService';
import { useStore } from '../../store/NotificationStore';

function EventList() {
  const [searchParams] = useSearchParams({ page: 1 });
  const [events, setEvents] = useState([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const store = useStore();

  useEffect(() => {
    EventService.getEvents(3, searchParams.get('page'))
      .then(res => {
        setEvents(res.data);
        setEventsTotal(res.headers['x-total-count']);
      })
      .catch(error => {
        console.log(error);
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        };
        store.add(notification);
      });
  }, [searchParams, store]);

  return (
    <div>
      <h1>Event Listing</h1>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      {searchParams.get('page') > 1 && (
        <Link to={`/?page=${parseInt(searchParams.get('page')) - 1}`}>
          Prev Page
        </Link>
      )}
      {' '}
      {searchParams.get('page') * 3 < eventsTotal && (
        <Link to={`/?page=${parseInt(searchParams.get('page')) + 1}`}>
          Next Page
        </Link>
      )}
    </div>
  );
}

export default EventList;
