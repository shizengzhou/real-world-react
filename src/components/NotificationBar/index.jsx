import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { StoreContext } from '../../store';
import './index.css';

const NotificationBar = observer(props => {
  const { notification } = props;
  const notificationBarClass = classNames(
    'notification-bar',
    `-text-${notification.type}`
  );
  const store = useContext(StoreContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      store.notificationStore.remove(notification);
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
