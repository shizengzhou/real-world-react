import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { StoreContext } from '../../store';
import NotificationBar from '../NotificationBar';
import './index.css';

const NotificationContainer = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div className="notification-container">
      {store.notificationStore.notifications.map(notification => (
        <NotificationBar key={notification.id} notification={notification} />
      ))}
    </div>
  );
});

export default NotificationContainer;
