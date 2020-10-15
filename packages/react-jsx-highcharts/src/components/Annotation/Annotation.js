import { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { logModuleErrorMessage } from '../../utils/warnings';
import useChart from '../UseChart';

const Annotation = memo(props => {
  const { id = uuid, children, ...rest } = props;

  const { addAnnotation, removeAnnotation } = useChart();

  if (process.env.NODE_ENV === 'development') {
    if (addAnnotation === null) {
      logModuleErrorMessage('<Annotation />', 'annotations');
    }
  }

  const idRef = useRef();

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

Annotation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Annotation.displayName = 'Annotation';

export default Annotation;
