import { useEffect } from 'react';
import { getEventsConfig, useChart } from 'react-jsx-highcharts';

import type { RangeSelectorButtonsOptions } from 'highcharts';
import type { ChartContextValue } from 'react-jsx-highcharts';

type RangeSelectorButtonProps = {
  children?: string;
} & Partial<Omit<RangeSelectorButtonsOptions, 'text'>>;

const RangeSelectorButton = ({
  count = 1,
  offsetMin = 0,
  offsetMax = 0,
  ...restProps
}: RangeSelectorButtonProps) => {
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

const getButtons = (chart: ChartContextValue) => {
  const chartObj = chart.object;
  if (chartObj && chartObj.options) {
    const rangeSelector = chartObj.options.rangeSelector ?? {};
    const { buttons = [] } = rangeSelector;
    return buttons;
  }

  return [];
};

type RangeSelectorButtonCountType = Pick<
  Highcharts.RangeSelectorButtonsOptions,
  'count' | 'type'
>;

const getButtonIndex = (
  props: RangeSelectorButtonCountType,
  chart: ChartContextValue
) => {
  const { count, type } = props;
  return getButtons(chart).findIndex(b => {
    return b.count === count && b.type === type;
  });
};

const addButton = (
  config: RangeSelectorButtonsOptions,
  chart: ChartContextValue
) => {
  // Add button to array
  const buttons = [...getButtons(chart), config];
  updateRangeSelectorButtons(buttons, chart);
};

const removeButton = (
  props: RangeSelectorButtonsOptions,
  chart: ChartContextValue
) => {
  const button = getButtonIndex(props, chart);
  if (button === -1) return;

  // Remove button from array
  const buttons = [...getButtons(chart)];
  buttons.splice(button, 1);
  updateRangeSelectorButtons(buttons, chart);
};

const updateRangeSelectorButtons = (
  config: RangeSelectorButtonsOptions[],
  chart: ChartContextValue
) => {
  chart.update({
    rangeSelector: {
      buttons: config
    }
  });
};

export default RangeSelectorButton;
