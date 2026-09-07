import { useEffect } from 'react';
import { useHighcharts, useChart } from 'react-jsx-highcharts';

import type HC from 'highcharts';
import type { ChartContextValue } from 'react-jsx-highcharts';

type MapNavigationZoomInButtonProps = Omit<
  HC.MapNavigationButtonsZoomInOptions,
  'text' | 'onclick'
> & {
  onClick?: HC.MapNavigationButtonsZoomInOptions['onclick'];
  type: 'zoomIn';
};

type MapNavigationZoomOutButtonProps = Omit<
  HC.MapNavigationButtonsZoomOutOptions,
  'text' | 'onclick'
> & {
  onClick?: HC.MapNavigationButtonsZoomOutOptions['onclick'];
  type: 'zoomOut';
};

type MapNavigationButtonProps = {
  children?: string;
} & (MapNavigationZoomInButtonProps | MapNavigationZoomOutButtonProps);

const MapNavigationButton = (props: MapNavigationButtonProps) => {
  const Highcharts = useHighcharts();
  const chart = useChart();

  useEffect(() => {
    const { type, ...rest } = props;
    const opts = getMapNavigationButtonConfig(rest, Highcharts);
    updateMapNavigationButton(type, opts, chart);

    return () => {
      // TODO removeButton was missing in original class?
      //const { type } = props;
      //attempt(this.removeButton, type, {});
    };
  }, []);

  return null;
};
const getMapNavigationButtonConfig = (
  props: Omit<MapNavigationButtonProps, 'type'>,
  Highcharts: typeof HC
) => {
  const { children: text, onClick: onclick, ...rest } = props;

  return {
    ...(Highcharts.defaultOptions &&
      //@ts-expect-error do we need type assertion?
      Highcharts.defaultOptions.mapNavigation.buttonOptions),
    onclick, // Weird Highcharts inconsistency, onclick instead of events: { click }
    ...rest,
    text
  };
};

const updateMapNavigationButton = (
  type: 'zoomIn' | 'zoomOut',
  config:
    | HC.MapNavigationButtonsZoomInOptions
    | HC.MapNavigationButtonsZoomOutOptions,
  chart: ChartContextValue
) => {
  const enableButtons = Object.keys(config).length > 0;

  chart.update({
    mapNavigation: {
      enableButtons,
      buttons: {
        [type]: config
      }
    }
  });
};

export default MapNavigationButton;
