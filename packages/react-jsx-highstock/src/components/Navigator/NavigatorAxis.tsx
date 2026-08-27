import * as React from 'react';
import {
  useRef,
  useEffect,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import {
  useAxis,
  useModifiedProps,
  getNonEventHandlerProps
} from 'react-jsx-highcharts';

import type { NavigatorXAxisOptions, NavigatorYAxisOptions } from 'highcharts';
import type { ReactNode } from 'react';

type NavigatorAxisProps = {
  children?: ReactNode;
  axisId: string;
} & Partial<NavigatorXAxisOptions | NavigatorYAxisOptions>;

const NavigatorAxis = ({
  children,
  axisId,
  ...restProps
}: NavigatorAxisProps) => {
  const axis = useAxis(axisId);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!axis) return;

    axis.update(getNonEventHandlerProps(restProps));
  }, [axis]);

  const modifiedProps = useModifiedProps(restProps);

  useEffect(() => {
    if (!renderedRef.current) {
      // don't update on first render
      renderedRef.current = true;
      return;
    }

    if (!axis) return;

    if (modifiedProps !== false) {
      // @ts-expect-error fix useModifiedProps typings
      axis.update(modifiedProps);
    }
  });

  if (!children) return null;

  const axisChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    // @ts-expect-error needs some typing work
    return cloneElement(child, { axisId });
  });

  return <>{axisChildren}</>;
};

export default NavigatorAxis;
