import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import { StoreContext } from '../../store';

const EventList = observer(() =>{
  const [searchParams] = useSearchParams({ page: 1 });
  const store = useContext(StoreContext);

  useEffect(() => {
    store.eventStore.fetchEvents(searchParams.get('page'));
  }, [searchParams, store]);

  return (
    <div>
      <h1>Event Listing</h1>
      {store.eventStore.events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      {searchParams.get('page') > 1 && (
        <Link to={`/?page=${parseInt(searchParams.get('page')) - 1}`}>
          Prev Page
        </Link>
      )}
      {' '}
      {searchParams.get('page') * 3 < store.eventStore.eventsTotal && (
        <Link to={`/?page=${parseInt(searchParams.get('page')) + 1}`}>
          Next Page
        </Link>
      )}
    </div>
  );
});

export default EventList;
