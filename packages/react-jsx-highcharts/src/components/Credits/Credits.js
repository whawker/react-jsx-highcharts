import PropTypes from 'prop-types';

import useChartUpdate from '../UseChartUpdate';

const Credits = ({ enabled = true, ...restProps }) => {
  useChartUpdate({ enabled, ...restProps }, updateCredits, chart =>
    updateCredits(chart, { enabled: false })
  );

  return null;
};

const updateCredits = (chart, config) => {
  // Use default Highcharts value if text is not explicitly set
  if ('text' in config && !config.text) delete config.text;
  chart.addCredits(config, true);
};

Credits.propTypes = {
  enabled: PropTypes.bool
};
export default Credits;
