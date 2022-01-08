import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/date';
import BaseIcon from '../BaseIcon';
import './index.css';

function EventCard(props) {
  const { event } = props;

  return (
    <Link className="event-link" to={`/event/${event.id}`}>
      <div className="event-card -shadow">
        <span className="eyebrow">
          @{event.time} on {formatDate(event.date)}
        </span>
        <h4 className="title">{event.title}</h4>
        <BaseIcon name="users">{event.attendees.length} attending</BaseIcon>
      </div>
    </Link>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventCard;
