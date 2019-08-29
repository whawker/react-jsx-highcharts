import { useRef, useEffect } from 'react';
import getModifiedProps from '../../utils/getModifiedProps';

export default function useModifiedProps(props) {
  const ref = useRef();
  useEffect(() => {
    ref.current = props;
  });
  return getModifiedProps(ref.current, props);
}
