import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useAxis from '../UseAxis';

const AxisTitle = memo(({ children: text, axisId, ...restProps }) => {
  const axis = useAxis(axisId);

  useEffect(() => {
    if (axis) {
      updateAxisTitle({ text, ...restProps }, axis);
    }
  });

  useEffect(() => {
    return () => {
      if (axis) attempt(updateAxisTitle, { text: null }, axis);
    };
  }, [axis]);

  return null;
});

const updateAxisTitle = (config, axis) => {
  axis.setTitle(config, true);
};

AxisTitle.displayName = 'AxisTitle';

export default AxisTitle;
