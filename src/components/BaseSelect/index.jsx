import PropTypes from 'prop-types';

function BaseSelect(props) {
  const { className, label, options, value, handleChange } = props;

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <select value={value} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

BaseSelect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func
};

BaseSelect.defaultProps = {
  className: ''
};

export default BaseSelect;
