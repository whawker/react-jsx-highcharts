import * as React from 'react';
import { useEffect } from 'react';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';

import type { ScrollbarOptions } from 'highcharts';
import type { ReactNode } from 'react';

type ScrollbarProps = {
  children?: ReactNode;
} & ScrollbarOptions;

const Scrollbar = ({
  children,
  enabled = true,
  ...restProps
}: ScrollbarProps) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      try {
        chart.update({ scrollbar: { enabled: false } }, true);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (modifiedProps !== false) {
      chart.update({ scrollbar: modifiedProps }, true);
    }
  });

  if (!children) return null;

  return <>{children}</>;
};

export default Scrollbar;
