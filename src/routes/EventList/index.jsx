import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import EventCard from '../../components/EventCard';
import { StoreContext } from '../../store';

const EventList = observer(() =>{
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(1);
  const store = useContext(StoreContext);

  useEffect(() => {
    const page = searchParams.get('page');
    console.log(page);
    if (!page) {
      setCurrent(1);
    } else {
      setCurrent(parseInt(page));
    }
    store.eventStore.fetchEvents(current);
  }, [searchParams, store, current]);

  function renderPageItem(page, type) {
    if (type === 'prev') {
      return <Link to={`/?page=${current - 1}`}>{type}</Link>
    }
    if (type === 'next') {
      return <Link to={`/?page=${current + 1}`}>{type}</Link>
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
