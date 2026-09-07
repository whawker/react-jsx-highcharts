import { useEffect, memo } from 'react';
import useChart from '../UseChart/index.ts';
import useHighcharts from '../UseHighcharts/index.ts';
import useModifiedProps from '../UseModifiedProps/index.ts';

import type { TooltipOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext/index.ts';

type TooltipProps = Partial<TooltipOptions>;

const Tooltip = memo((props: TooltipProps) => {
  // @ts-expect-error TODO
  const { children, ...restProps } = props;
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

const updateTooltip = (
  chart: ChartContextValue,
  config: Partial<TooltipOptions>
) => {
  chart.update({
    tooltip: config
  });
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
