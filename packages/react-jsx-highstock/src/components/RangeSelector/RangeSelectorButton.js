import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getEventsConfig, useChart } from 'react-jsx-highcharts';

const RangeSelectorButton = ({
  count = 1,
  offsetMin = 0,
  offsetMax = 0,
  ...restProps
}) => {
  const props = { count, offsetMin, offsetMax, ...restProps };

  const chart = useChart();

  useEffect(() => {
    const button = getButtonIndex(props, chart);
    if (button > -1) return; // Button already present

    const {
      count,
      type,
      offsetMin,
      offsetMax,
      dataGrouping,
      children: text,
      ...rest
    } = props;
    const opts = {
      count,
      type,
      offsetMin,
      offsetMax,
      dataGrouping,
      text,
      events: getEventsConfig(rest)
    };

    addButton(opts, chart);

    return () => {
      try {
        removeButton(props, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  return null;
};

const getButtons = chart => {
  const chartObj = chart.object;
  if (chartObj && chartObj.options) {
    const { buttons = [] } = chartObj.options.rangeSelector;
    return buttons;
  }

  return [];
};

const getButtonIndex = (props, chart) => {
  const { count, type } = props;
  return getButtons(chart).findIndex(b => {
    return b.count === count && b.type === type;
  });
};

const addButton = (config, chart) => {
  // Add button to array
  const buttons = [...getButtons(chart), config];
  updateRangeSelectorButtons(buttons, chart);
};

const removeButton = (props, chart) => {
  const button = getButtonIndex(props);
  if (button === -1) return;

  // Remove button from array
  const buttons = [...getButtons()];
  buttons.splice(button, 1);
  updateRangeSelectorButtons(buttons, chart);
};

const updateRangeSelectorButtons = (config, chart) => {
  chart.update({
    rangeSelector: {
      buttons: config
    }
  });
};

RangeSelectorButton.propTypes = {
  count: PropTypes.number,
  type: PropTypes.oneOf([
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'ytd',
    'all'
  ]),
  offsetMin: PropTypes.number.isRequired,
  offsetMax: PropTypes.number.isRequired,
  dataGrouping: PropTypes.object
};

export default RangeSelectorButton;
