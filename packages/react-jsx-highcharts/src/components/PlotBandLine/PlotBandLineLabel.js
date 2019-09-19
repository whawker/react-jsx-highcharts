import { useContext, useEffect, memo } from 'react';
import { pickBy } from 'lodash-es';
import { attempt } from 'lodash-es';
import PlotLineContext from './PlotBandLineContext';

const PlotBandLineLabel = memo(props => {
  const plotbandline = useContext(PlotLineContext);

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
  return pickBy(props, (value, propName) => {
    return labelProps.has(propName);
  });
};

const labelProps = new Set([
  'text',
  'align',
  'rotation',
  'style',
  'textAlign',
  'useHTML',
  'verticalAlign',
  'x',
  'y'
]);

PlotBandLineLabel.displayName = 'PlotBandLineLabel';

export default PlotBandLineLabel;
