import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import EventCard from '../../components/EventCard';
import { StoreContext } from '../../store';

const EventList = observer(() =>{
  const [searchParams] = useSearchParams({ page: 1 });
  const [current, setCurrent] = useState(parseInt(searchParams.get('page')));
  const store = useContext(StoreContext);

  useEffect(() => {
    store.eventStore.fetchEvents(searchParams.get('page'));
  }, [searchParams, store]);

  function renderPageItem(page, type) {
    if (type === 'prev') {
      return <Link to={`/?page=${parseInt(searchParams.get('page')) - 1}`}>{type}</Link>
    }
    if (type === 'next') {
      return <Link to={`/?page=${parseInt(searchParams.get('page')) + 1}`}>{type}</Link>
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
        current={current}
        total={store.eventStore.eventsTotal}
        itemRender={renderPageItem}
        onChange={page => setCurrent(page)}
      />
    </div>
  );
});

export default EventList;
