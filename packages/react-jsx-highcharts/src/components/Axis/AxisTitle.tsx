import { useEffect, memo } from 'react';
import useAxis from '../UseAxis';

import type { AxisTitleOptions } from 'highcharts';

type AxisTitleProps = {
  children?: string;
  axisId?: string;
} & Partial<Omit<AxisTitleOptions, 'text'>>;

const AxisTitle = memo(
  ({ children: text, axisId, ...restProps }: AxisTitleProps) => {
    const axis = useAxis(axisId);

    useEffect(() => {
      if (axis) {
        axis.setTitle({ text, ...restProps }, true);
      }
    });

    useEffect(() => {
      return () => {
        if (axis) {
          try {
            axis.setTitle({ text: null }, true);
          } catch {
            // ignore as axis might have been already unmounted
          }
        }
      };
    }, [axis]);

    return null;
  }
);

AxisTitle.displayName = 'AxisTitle';

export default AxisTitle;
