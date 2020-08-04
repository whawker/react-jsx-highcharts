import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import usePlotBandLine from '../UsePlotBandLine';

const PlotBandLineLabel = memo(props => {
  const providedPlotbandline = usePlotBandLine();

  useEffect(() => {
    if (!providedPlotbandline) return;
    const { children: text, id, ...rest } = props;
    updatePlotBandLineLabel(providedPlotbandline.object, {
      text,
      ...rest
    });
  });

  useEffect(() => {
    return () => {
      if (!providedPlotbandline) return;
      attempt(updatePlotBandLineLabel, providedPlotbandline.object, {
        text: null
      });
    };
  }, []);

  return null;
});

const updatePlotBandLineLabel = (plotbandline, config) => {
  if (plotbandline) {
    plotbandline.options.label = getLabelProps(config);
    plotbandline.render();
  }
};

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
