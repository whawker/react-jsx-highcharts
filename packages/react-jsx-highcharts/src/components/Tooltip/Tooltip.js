import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { attempt, defaultTo } from 'lodash-es';
import useChart from '../UseChart';
import useHighcharts from '../UseHighcharts';
import useModifiedProps from '../UseModifiedProps';

const Tooltip = memo(props => {
  // eslint-disable-next-line no-unused-vars
  const { children = null, ...restProps } = props;
  const chart = useChart();
  const Highcharts = useHighcharts();

  restProps.enabled = defaultTo(props.enabled, true);

  useEffect(() => {
    const chartObj = chart.object;
    chartObj.tooltip = new Highcharts.Tooltip(chartObj, {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
      ...restProps
    });

    return () => {
      attempt(updateTooltip, chart, { enabled: false });
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
  const tooltip = chart.object.tooltip;
  tooltip.update(config);
};

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  enabled: PropTypes.bool
};

export default Tooltip;
