import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

function BaseButton(props) {
  const { type, className, children, handleClick } = props;
  const buttonClass = classNames('button', className);

  return (
    <div>
      <button type={type} className={buttonClass} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

BaseButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  handleClick: PropTypes.func
};

BaseButton.defaultProps = {
  type: 'button',
  className: ''
};

export default BaseButton;
