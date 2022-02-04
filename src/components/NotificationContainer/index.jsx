import { useSelector } from 'react-redux';
import { selectAllNotifications } from '../../reducers/notificationsSlice';
import NotificationBar from '../NotificationBar';
import './index.css';

const NotificationContainer = () => {
  const notifications = useSelector(selectAllNotifications);

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <NotificationBar key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
