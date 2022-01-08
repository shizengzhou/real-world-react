import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseIcon from '../../components/BaseIcon';
import EventService from '../../services/EventService';
import formatDate from '../../utils/date';
import './index.css';

function EventShow() {
  const [event, setEvent] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    EventService.getEvent(params.eventId)
      .then(res => {
        setEvent(res.data);
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          navigate('/404', { replace: true, state: { resource: 'event' } })
        }
      });
  }, [params.eventId]);

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
}

export default EventShow;
