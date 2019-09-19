import React, { useRef, useEffect, useState, memo, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import Hidden from '../Hidden';
import { logModuleErrorMessage } from '../../utils/warnings';
import useChart from '../UseChart';

const Annotation = memo((props) => {
  const { id = uuid, children, ...rest } = props;

  const { addAnnotation, removeAnnotation } = useChart();

  if (process.env.NODE_ENV === 'development') {
    if (addAnnotation === null) {
      logModuleErrorMessage('<Annotation />', 'annotations');
    }
  }

  const idRef = useRef();

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const opts = {
      id: myId,
      ...rest
    }
    addAnnotation(opts);
    if(!rendered) setRendered(true);
    return () => {
      attempt(removeAnnotation, myId);
    }
  });

  if (!children || !rendered) return null;

  const annotationChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    return cloneElement(child, { id: idRef.current});
  });

  return (
    <Hidden>
      {annotationChildren}
    </Hidden>
  );
})

Annotation.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
  children: PropTypes.node
};

Annotation.displayName = 'Annotation';

export default Annotation;
