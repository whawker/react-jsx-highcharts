import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';

const Credits = (props) => {
  const { getChart } = useChart();
  const modifiedProps = useModifiedProps(props, true);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateCredits(modifiedProps, getChart());
    }
  })

  useEffect(() => {
    return () => attempt(updateCredits, { enabled: false }, getChart());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return null;
}

const updateCredits = (config, chart) => {
  // Use default Highcharts value if text is not explicitly set
  if ('text' in config && !config.text) delete config.text
  chart.addCredits(config, true);
}

Credits.defaultProps = {
  enabled: true
};
Credits.propTypes = {
  enabled: PropTypes.bool
};
export default Credits;
