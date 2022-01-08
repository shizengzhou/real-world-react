import PropTypes from 'prop-types';

function BaseInput(props) {
  const { className, label, placeholder, value, handleChange } = props;

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

BaseInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func
};

BaseInput.defaultProps = {
  className: '',
  placeholder: ''
};

export default BaseInput;
