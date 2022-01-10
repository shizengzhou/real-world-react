import { observer } from 'mobx-react-lite';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseIcon from '../../components/BaseIcon';
import { StoreContext } from '../../store';
import formatDate from '../../utils/date';
import './index.css';

const EventShow = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const { eventStore } = useContext(StoreContext);
  const event = eventStore.event;

  useEffect(() => {
    eventStore
      .fetchEvent(params.eventId)
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          navigate('/404', { replace: true, state: { resource: 'event' } });
        } else {
          navigate('/network-issue');
        }
      });
  }, [params.eventId, eventStore]);

  return (
    event && (
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
    )
  );
});

export default EventShow;
