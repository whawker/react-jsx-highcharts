import { useRef, useEffect, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { logModuleErrorMessage } from '../../utils/warnings';
import useChart from '../UseChart';

import type { AnnotationsOptions } from 'highcharts';

type AnnotationProps = Partial<AnnotationsOptions>;

const Annotation = memo((props: AnnotationProps) => {
  // @ts-expect-error TODO
  const { id = uuid, children, ...rest } = props;

  const { addAnnotation, removeAnnotation } = useChart();
  // @ts-expect-error TODO
  if (process.env.NODE_ENV === 'development') {
    if (addAnnotation === null) {
      logModuleErrorMessage('<Annotation />', 'annotations');
    }
  }

  const idRef = useRef<string | number>(undefined);

  useEffect(() => {
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const opts = {
      id: myId,
      ...rest
    };
    addAnnotation(opts);

    return () => {
      try {
        removeAnnotation(myId);
      } catch {
        // ignoring as parent chart might be unmounted
      }
    };
  });

  return null;
});

Annotation.displayName = 'Annotation';

export default Annotation;
