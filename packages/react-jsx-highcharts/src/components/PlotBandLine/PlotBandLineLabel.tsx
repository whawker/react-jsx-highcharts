import { useEffect, memo } from 'react';
import { usePlotBand, usePlotLine } from '../UsePlotBandLine/index.ts';

import type { ReactNode } from 'react';
import type {
  AxisPlotBandsLabelOptions,
  AxisPlotLinesLabelOptions
} from 'highcharts';
import type {
  PlotBandContextValue,
  PlotLineContextValue
} from '../PlotBandLineContext/index.ts';

export type PlotBandLabelProps = {
  children?: ReactNode;
} & Partial<Omit<AxisPlotBandsLabelOptions, 'text'>>;

export type PlotLineLabelProps = {
  children?: ReactNode;
} & Partial<Omit<AxisPlotLinesLabelOptions, 'text'>>;

const PlotBandLabel = memo((props: PlotBandLabelProps) => {
  const providedPlotBand = usePlotBand();
  usePlotBandLineLabelLifecycle(providedPlotBand, props);
  return null;
});

const PlotLineLabel = memo((props: PlotLineLabelProps) => {
  const providedPlotLine = usePlotLine();
  usePlotBandLineLabelLifecycle(providedPlotLine, props);
  return null;
});

const usePlotBandLineLabelLifecycle = (
  providedPlotbandline: PlotBandContextValue | PlotLineContextValue | null,
  props: PlotBandLabelProps | PlotLineLabelProps
) => {
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
};

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

PlotBandLabel.displayName = 'PlotBandLabel';
PlotLineLabel.displayName = 'PlotLineLabel';

export { PlotBandLabel, PlotLineLabel };
