import { useContext, useEffect, memo } from 'react';
import { pickBy } from 'lodash-es';
import { attempt } from 'lodash-es';
import PlotLineContext from './PlotBandLineContext';
import useModifiedProps from '../UseModifiedProps';

const PlotBandLineLabel = memo(props => {
  const plotbandline = useContext(PlotLineContext);

  const modifiedProps = useModifiedProps(props, true);

  useEffect(() => {
    if (modifiedProps === false) return;
    const { children: text, ...rest } = props;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return pickBy(props, (value, propName) => {
    return labelProps.indexOf(propName) > -1;
  });
};
const labelProps = [
  'text',
  'align',
  'rotation',
  'style',
  'textAlign',
  'useHTML',
  'verticalAlign',
  'x',
  'y'
];

PlotBandLineLabel.displayName = 'PlotBandLineLabel';

export default PlotBandLineLabel;
