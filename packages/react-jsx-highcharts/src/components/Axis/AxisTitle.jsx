import { useEffect, memo } from 'react';
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
      if (axis) {
        try {
          updateAxisTitle({ text: null }, axis);
        } catch {
          // ignore as axis might have been already unmounted
        }
      }
    };
  }, [axis]);

  return null;
});

const updateAxisTitle = (config, axis) => {
  axis.setTitle(config, true);
};

AxisTitle.displayName = 'AxisTitle';

export default AxisTitle;
