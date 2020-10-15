import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import useChart from '../UseChart';
import useHighcharts from '../UseHighcharts';
import useModifiedProps from '../UseModifiedProps';

const Tooltip = memo(props => {
  // eslint-disable-next-line no-unused-vars
  const { children = null, ...restProps } = props;
  const chart = useChart();
  const Highcharts = useHighcharts();

  restProps.enabled = props.enabled ?? true;

  useEffect(() => {
    updateTooltip(chart, {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
      ...restProps
    });

    return () => {
      try {
        updateTooltip(chart, { enabled: false });
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps(restProps);
  useEffect(() => {
    if (modifiedProps !== false) {
      updateTooltip(chart, modifiedProps);
    }
  });

  return null;
});

const updateTooltip = (chart, config) => {
  chart.update({
    tooltip: config
  });
};

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  enabled: PropTypes.bool
};

export default Tooltip;
