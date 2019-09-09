import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useAxis from '../UseAxis';

const AxisTitle = memo(({ children: text, axisId, ...restProps}) => {
  const getAxis = useAxis(axisId);

  useEffect(() => {
    if (getAxis) {
      updateAxisTitle({ text, ...restProps}, getAxis());
    }
  });

  useEffect(() => {
    return () => {
      if (getAxis) attempt(updateAxisTitle, { text: null }, getAxis());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAxis]);

  return null;
});

const updateAxisTitle = (config, axis) => {
  axis.setTitle(config, true);
};

AxisTitle.displayName = 'AxisTitle';

export default AxisTitle;
