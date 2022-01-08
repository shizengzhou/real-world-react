import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useStore } from '../../store/NotificationStore';
import './index.css';

const NotificationBar = observer(props => {
  const { notification } = props;
  const notificationBarClass = classNames(
    'notification-bar',
    `-text-${notification.type}`
  );
  const store = useStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      store.remove(notification);
    }, 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <div className={notificationBarClass}>
      <p>{notification.message}</p>
    </div>
  );
});

NotificationBar.propTypes = {
  notification: PropTypes.object.isRequired
};

export default NotificationBar;
