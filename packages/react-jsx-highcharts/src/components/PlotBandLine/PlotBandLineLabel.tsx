import { useEffect, memo } from 'react';
import usePlotBandLine from '../UsePlotBandLine';

import type { ReactNode } from 'react';
import type {
  AxisPlotBandsLabelOptions,
  AxisPlotLinesLabelOptions
} from 'highcharts';

export type PlotBandLabelProps = {
  children?: ReactNode;
} & Partial<Omit<AxisPlotBandsLabelOptions, 'text'>>;

export type PlotLineLabelProps = {
  children?: ReactNode;
} & Partial<Omit<AxisPlotLinesLabelOptions, 'text'>>;

const PlotBandLineLabel = memo(
  (props: PlotBandLabelProps | PlotLineLabelProps) => {
    const providedPlotbandline = usePlotBandLine();

    useEffect(() => {
      if (!providedPlotbandline) return;
      // @ts-expect-error TODO
      const { children: text, id, ...rest } = props;
      updatePlotBandLineLabel(providedPlotbandline.object, {
        text,
        ...rest
      });
    });

    useEffect(() => {
      return () => {
        if (!providedPlotbandline) return;
        try {
          updatePlotBandLineLabel(providedPlotbandline.object, {
            text: null
          });
        } catch {
          // ignore as axis might have been unmounted
        }
      };
    }, []);

    return null;
  }
);

// @ts-expect-error TODO
const updatePlotBandLineLabel = (plotbandline, config) => {
  if (plotbandline) {
    plotbandline.options.label = getLabelProps(config);
    plotbandline.render();
  }
};

// @ts-expect-error TODO
const getLabelProps = props => {
  const {
    text,
    formatter,
    align,
    rotation,
    style,
    textAlign,
    useHTML,
    verticalAlign,
    x,
    y
  } = props;

  return {
    text,
    formatter,
    align,
    rotation,
    style,
    textAlign,
    useHTML,
    verticalAlign,
    x,
    y
  };
};

PlotBandLineLabel.displayName = 'PlotBandLineLabel';

export default PlotBandLineLabel;
