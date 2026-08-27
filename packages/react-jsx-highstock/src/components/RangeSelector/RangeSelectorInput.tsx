import { useEffect } from 'react';
import {
  useModifiedProps,
  useChart,
  type ChartContextValue
} from 'react-jsx-highcharts';

import type {
  ColorString,
  CSSObject,
  RangeSelectorParseCallbackFunction,
  RangeSelectorInputPositionOptions,
  RangeSelectorOptions
} from 'highcharts';

type RangeSelectorInputProps = {
  boxBorderColor?: ColorString;
  boxHeight?: number;
  boxWidth?: number | undefined;
  dateFormat?: string;
  dateParser?: RangeSelectorParseCallbackFunction;
  editDateFormat?: string;
  enabled?: boolean;
  position?: RangeSelectorInputPositionOptions;
  spacing?: number;
  style?: CSSObject;
};

const RangeSelectorInput = ({
  enabled = true,
  ...restProps
}: RangeSelectorInputProps) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      try {
        updateRangeSelectorInputs({ enabled: false }, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (modifiedProps !== false) {
      updateRangeSelectorInputs(modifiedProps, chart);
    }
  });

  return null;
};

const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const prefixPropsWithInput = <T extends Record<string, unknown>>(config: T) => {
  const prefixedConfig: Record<string, unknown> = {};

  Object.keys(config).forEach(key => {
    const newKey = key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
    prefixedConfig[newKey] = config[key];
  });

  return prefixedConfig;
};

const updateRangeSelectorInputs = (
  config: Partial<RangeSelectorOptions>,
  chart: ChartContextValue
) => {
  const inputProps = prefixPropsWithInput(config);

  chart.update({
    rangeSelector: {
      ...inputProps
    }
  });
};

export default RangeSelectorInput;
