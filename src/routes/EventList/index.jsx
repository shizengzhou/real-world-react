import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import EventCard from '../../components/EventCard';
import { StoreContext } from '../../store';

const EventList = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const store = useContext(StoreContext);

  useEffect(() => {
    store.eventStore.fetchEvents(Number(searchParams.get('page')));
  }, [searchParams, store]);

  function renderPageItem(page, type) {
    if (type === 'prev') {
      return (
        <Link to={`/?page=${Number(searchParams.get('page')) - 1}`}>
          {type}
        </Link>
      );
    }
    if (type === 'next') {
      return (
        <Link to={`/?page=${Number(searchParams.get('page')) + 1}`}>
          {type}
        </Link>
      );
    }
    return <Link to={`/?page=${page}`}>{page}</Link>;
  }

  return (
    <div>
      <h1>Event Listing</h1>
      {store.eventStore.events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      <Pagination
        defaultPageSize={3}
        defaultCurrent={1}
        current={Number(searchParams.get('page'))}
        total={store.eventStore.eventsTotal}
        itemRender={renderPageItem}
        onChange={page => setSearchParams({ page })}
      />
    </div>
  );
});

export default EventList;
