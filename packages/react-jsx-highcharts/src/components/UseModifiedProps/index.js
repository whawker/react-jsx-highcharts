import { useRef, useEffect, useDebugValue } from 'react';
import getModifiedProps from '../../utils/getModifiedProps';

export default function useModifiedProps(props, childrenIsText = false) {
  const ref = useRef();
  useEffect(() => {
    ref.current = props;
  });
  const modifiedProps = getModifiedProps(ref.current, props, childrenIsText);

  useDebugValue(modifiedProps ? 'Modified' : 'Not modified');

  return modifiedProps;
}
