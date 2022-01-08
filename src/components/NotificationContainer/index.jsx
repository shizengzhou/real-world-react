import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/NotificationStore';
import NotificationBar from '../NotificationBar';
import './index.css';

const NotificationContainer = observer(() => {
  const store = useStore();

  return (
    <div className="notification-container">
      {store.notifications.map(notification => (
        <NotificationBar key={notification.id} notification={notification} />
      ))}
    </div>
  );
});

export default NotificationContainer;
