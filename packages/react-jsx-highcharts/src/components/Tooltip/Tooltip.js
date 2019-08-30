import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { defaultTo } from 'lodash-es';
import useChart from '../UseChart';
import useHighcharts from '../UseHighcharts';

import useModifiedProps from '../UseModifiedProps';

const Tooltip = memo((props) => {
  // eslint-disable-next-line no-unused-vars
  const { children = null, ...restProps } = props;
  const { getChart, needsRedraw } = useChart();
  const getHighcharts = useHighcharts();
  const modifiedProps = useModifiedProps(restProps);

  restProps.enabled = defaultTo(props.enabled, true);

  const updateTooltip = config => {
    const chart = getChart();
    chart.update({
      tooltip: config
    }, false);
    needsRedraw();
  };

  useEffect(() => {
    const Highcharts = getHighcharts();
    const chartObj = getChart().object;

    chartObj.tooltip = new Highcharts.Tooltip(chartObj, {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
      ...restProps
    });
    return () => attempt(updateTooltip, { enabled: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (modifiedProps !== false) {
      updateTooltip(modifiedProps);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return null;
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  enabled: PropTypes.bool
};


export default Tooltip;
