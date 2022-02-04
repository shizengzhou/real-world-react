import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NProgress from 'nprogress';
import BaseIcon from '../../components/BaseIcon';
import { fetchEvent, selectEventById } from '../../reducers/eventsSlice';
import formatDate from '../../utils/date';
import './index.css';

const EventShow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  let event = useSelector(state =>
    selectEventById(state, Number(params.eventId))
  );

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchEvent(params.eventId)).unwrap();
      } catch (error) {
        if (error.message === 'Request failed with status code 404') {
          navigate('/404', { replace: true, state: { resource: 'event' } });
        } else {
          navigate('/network-issue');
        }
        NProgress.done();
      }
    }
    if (!event) {
      fetchData();
    }
  });

  return event ? (
    <div>
      <div className="event-header">
        <span className="eyebrow">
          @{event.time} on {formatDate(event.date)}
        </span>
        <h1 className="title">{event.title}</h1>
        <h5>Organized by {event.organizer}</h5>
        <h5>Category: {event.category}</h5>
      </div>
      <BaseIcon name="map">
        <h2>Location</h2>
      </BaseIcon>
      <address>{event.location}</address>
      <h2>Event details</h2>
      <p>{event.description}</p>
      <h2>
        Attendees
        <span className="badge -fill-gradient">
          {event.attendees ? event.attendees.length : 0}
        </span>
      </h2>
      <ul className="list-group">
        {event.attendees.map((attendee, index) => (
          <li key={index} className="list-item">
            {attendee.name}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    ''
  );
};

export default EventShow;
