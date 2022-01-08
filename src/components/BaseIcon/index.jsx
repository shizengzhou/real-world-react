import PropTypes from 'prop-types';
import feather from 'feather-icons';
import './index.css';

function BaseIcon(props) {
  const { name, width, height, children } = props;

  function createSvg(name, width, height) {
    return feather.icons[name].toSvg({
      class: 'icon',
      width,
      height
    });
  }

  return (
    <div>
      <span
        className="icon-wrapper"
        dangerouslySetInnerHTML={{ __html: createSvg(name, width, height) }}
      ></span>
      {children}
    </div>
  );
}

BaseIcon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node
};

BaseIcon.defaultProps = {
  width: 24,
  height: 24
};

export default BaseIcon;
