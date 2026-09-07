import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  useModifiedProps,
  useChart,
  useHighcharts
} from 'react-jsx-highcharts';

import type { ReactNode } from 'react';
import type { MapNavigationOptions } from 'highcharts';
import type { ChartContextValue } from 'react-jsx-highcharts';
import type HC from 'highcharts';

type MapNavigationProps = {
  children?: ReactNode;
} & Partial<MapNavigationOptions>;

const MapNavigation = ({
  children,
  enabled = true,
  ...restProps
}: MapNavigationProps) => {
  const [rendered, setRendered] = useState(false);
  const chart = useChart();
  const Highcharts = useHighcharts();

  useEffect(() => {
    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    // @ts-expect-error do we need type assertion?
    chartObj.options.mapNavigation.enabled = true;
    // Initialise MapNavigation https://github.com/highcharts/highcharts/blob/dd730ab/js/parts-map/MapNavigation.js#L288-L294
    Highcharts.fireEvent(chartObj, 'beforeRender');

    const opts = getMapNavigationConfig({ enabled, ...restProps }, Highcharts);
    updateMapNavigation(opts, chart);

    setRendered(true);

    return () => {
      try {
        updateMapNavigation({ enabled: false }, chart);
      } catch {
        // ignore as chart might have already been unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (!rendered) return;
    if (modifiedProps !== false) {
      updateMapNavigation(modifiedProps, chart);
    }
  });

  if (!children || !rendered) return null;

  return <>{children}</>;
};
const getMapNavigationConfig = (
  props: Partial<MapNavigationOptions>,
  Highcharts: typeof HC
) => {
  return {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.mapNavigation),
    ...props,
    enableButtons: false,
    buttons: {
      zoomIn: {},
      zoomOut: {}
    }
  };
};

const updateMapNavigation = (
  config: Partial<MapNavigationOptions>,
  chart: ChartContextValue
) => {
  chart.update({ mapNavigation: config }, true);
};

export default MapNavigation;
