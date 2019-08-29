import { useRef, useEffect, useDebugValue } from 'react';
import getModifiedProps from '../../utils/getModifiedProps';

export default function useModifiedProps(props) {
  const ref = useRef();
  useEffect(() => {
    ref.current = props;
  });
  const modifiedProps = getModifiedProps(ref.current, props);

  useDebugValue(modifiedProps ? 'Modified' : 'Not modified');

  return modifiedProps;
}
