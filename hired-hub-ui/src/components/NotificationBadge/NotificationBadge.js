import React from 'react';
import PropTypes from 'prop-types';
import './NotificationBadge.scss';
import bell from '../../assets/icons/bell.svg';

const NotificationBadge = ({ unreadCount }) => {
  return (
    <div className="notification-badge">
      <span className="icon">
        <img src={bell} alt='bell' />
      </span>
      {unreadCount > 0 && (
        <span className="count">{unreadCount}</span>
      )}
    </div>
  );
};

NotificationBadge.propTypes = {
  unreadCount: PropTypes.number.isRequired,
};

export default NotificationBadge;
