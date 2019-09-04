import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import useModifiedProps from '../UseModifiedProps';

const AxisTitle = memo((props) => {
  const { getAxis } = props;

  const modifiedProps = useModifiedProps(props, true);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateAxisTitle(modifiedProps, getAxis());
    }
  });

  useEffect(() => {
    return () => attempt(updateAxisTitle, { text: null }, getAxis());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
})

const updateAxisTitle = (config, axis) => {
  axis.setTitle(config, true);
}

AxisTitle.propTypes = {
  getAxis: PropTypes.func.isRequired // Provided by AxisProvider
};

export default AxisTitle;
