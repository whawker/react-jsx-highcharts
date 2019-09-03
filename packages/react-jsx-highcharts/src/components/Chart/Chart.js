import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { addEventHandlersManually, getNonEventHandlerProps } from '../../utils/events';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import useHighcharts from '../UseHighcharts';

const Chart = memo((props) => {
  const { getChart, needsRedraw } = useChart();
  const getHighcharts = useHighcharts();
  const mounted = useRef(false);

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if(modifiedProps !== false && mounted.current) {
      const { width, height, ...restModified } = modifiedProps;
      if(width || height) {
        getChart().setSize(props.width, props.height);
      }
      if(Object.getOwnPropertyNames(restModified).length > 0) {
        updateChart(restModified, getChart(), needsRedraw);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);

  useEffect(() => {
    const { width, height, ...rest } = props;

    const notEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    chart.setSize(width, height);
    updateChart(notEventProps, getChart(), needsRedraw);
    addEventHandlersManually(getHighcharts(), chart.object, rest);
    mounted.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
})

const updateChart = (config, chart, needsRedraw) => {
  chart.update({
    chart: config
  }, false);
  needsRedraw();
}

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onAddSeries: PropTypes.func,
  onAfterPrint: PropTypes.func,
  onBeforePrint: PropTypes.func,
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
  onRedraw: PropTypes.func,
  onRender: PropTypes.func,
  onSelection: PropTypes.func
};

Chart.defaultProps = {
  type: 'line',
  onAddSeries: () => {},
  onAfterPrint: () => {},
  onBeforePrint: () => {},
  onClick: () => {},
  onLoad: () => {},
  onRedraw: () => {},
  onRender: () => {},
  onSelection: () => {}
};

Chart.displayName = 'Chart';

export default Chart;
