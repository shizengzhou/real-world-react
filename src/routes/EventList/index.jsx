import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import EventCard from '../../components/EventCard';
import { fetchEvents, selectAllEvents } from '../../reducers/eventsSlice';
import { addNotification } from '../../reducers/notificationsSlice';

const EventList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({ page: 1 });
  const [current, setCurrent] = useState(parseInt(searchParams.get('page')));

  const events = useSelector(selectAllEvents);
  const eventsTotal = useSelector(state => state.events.eventsTotal);

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(
          fetchEvents({ perPage: 3, page: searchParams.get('page') })
        ).unwrap();
      } catch (error) {
        console.log(error);
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        };
        dispatch(addNotification(notification));
      }
    }
    fetchData();
  }, [dispatch, searchParams]);

  function renderPageItem(page, type) {
    if (type === 'prev') {
      return (
        <Link to={`/?page=${parseInt(searchParams.get('page')) - 1}`}>
          {type}
        </Link>
      );
    }
    if (type === 'next') {
      return (
        <Link to={`/?page=${parseInt(searchParams.get('page')) + 1}`}>
          {type}
        </Link>
      );
    }
    return <Link to={`/?page=${page}`}>{page}</Link>;
  }

  return (
    <div>
      <h1>Event Listing</h1>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      <Pagination
        defaultPageSize={3}
        defaultCurrent={1}
        current={current}
        total={eventsTotal}
        itemRender={renderPageItem}
        onChange={page => setCurrent(page)}
      />
    </div>
  );
};

export default EventList;
