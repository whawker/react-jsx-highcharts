import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { getNonEventHandlerProps } from '../../utils/events';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import useManualEventHandlers from '../UseManualEventHandlers';

const Chart = memo(({ type = 'line', ...restProps }) => {
  const chart = useChart();
  const mounted = useRef(false);

  const modifiedProps = useModifiedProps({ type, ...restProps });

  useEffect(() => {
    if (modifiedProps !== false && mounted.current) {
      const { width, height, ...restModified } = modifiedProps;
      if (width || height) {
        chart.setSize(restProps.width, restProps.height);
      }
      const notEventProps = getNonEventHandlerProps(restModified);
      if (Object.getOwnPropertyNames(notEventProps).length > 0) {
        updateChart(restModified, chart, chart.needsRedraw);
      }
    }
  });

  useEffect(() => {
    const { width, height, ...rest } = restProps;

    const notEventProps = getNonEventHandlerProps({ type, ...rest });

    chart.setSize(width, height);
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
