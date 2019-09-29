import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import usePlotBandLine from './usePlotBandLine';

const PlotBandLineLabel = memo(props => {
  const plotbandline = usePlotBandLine();

  useEffect(() => {
    const { children: text, id, ...rest } = props;
    updatePlotBandLineLabel(plotbandline, {
      text,
      ...rest
    });
  });

  useEffect(() => {
    return () => {
      attempt(updatePlotBandLineLabel, plotbandline, {
        text: null
      });
    };
  }, [plotbandline]);

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
  align,
  rotation,
  style,
  textAlign,
  useHTML,
  verticalAlign,
  x,
  y} = props;

  return {
    text,
    align,
    rotation,
    style,
    textAlign,
    useHTML,
    verticalAlign,
    x,
    y }
};

PlotBandLineLabel.displayName = 'PlotBandLineLabel';

export default PlotBandLineLabel;
