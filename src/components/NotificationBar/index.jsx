import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { removeNotification } from '../../reducers/notificationsSlice';
import './index.css';

const NotificationBar = props => {
  const dispatch = useDispatch();
  const { notification } = props;
  const notificationBarClass = classNames(
    'notification-bar',
    `-text-${notification.type}`
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeNotification(notification));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  return (
    <div className={notificationBarClass}>
      <p>{notification.message}</p>
    </div>
  );
};

NotificationBar.propTypes = {
  notification: PropTypes.object.isRequired
};

export default NotificationBar;
