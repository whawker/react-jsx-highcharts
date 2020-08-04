import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { getNonEventHandlerProps } from '../../utils/events';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import useManualEventHandlers from '../UseManualEventHandlers';

const Chart = memo(({ type = 'line', width, height, ...restProps }) => {
  const chart = useChart();
  const mounted = useRef(false);

  const modifiedProps = useModifiedProps({ type, ...restProps });

  useEffect(() => {
    if (!(width === undefined && height === undefined)) {
      chart.setSize(width, height);
    }
  }, [width, height]);

  useEffect(() => {
    if (modifiedProps !== false && mounted.current) {
      const notEventProps = getNonEventHandlerProps(modifiedProps);
      if (Object.getOwnPropertyNames(notEventProps).length > 0) {
        updateChart(modifiedProps, chart, chart.needsRedraw);
      }
    }
  });

  useEffect(() => {
    const notEventProps = getNonEventHandlerProps({ type, ...restProps });

    updateChart(notEventProps, chart);
    mounted.current = true;
  }, []);

  useManualEventHandlers(restProps, chart.object);

  return null;
});

const updateChart = (config, chart) => {
  chart.update({ chart: config }, false);
  chart.needsRedraw();
};

Chart.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAddSeries: PropTypes.func,
  onAfterPrint: PropTypes.func,
  onBeforePrint: PropTypes.func,
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
  onRedraw: PropTypes.func,
  onRender: PropTypes.func,
  onSelection: PropTypes.func
};

Chart.displayName = 'Chart';

export default Chart;
