import { useRef, useEffect, useDebugValue } from 'react';
import getModifiedProps from '../../utils/getModifiedProps';

/**
 *
 * @private
 */
const useModifiedProps = function useModifiedProps<
  P extends Record<string, unknown> & { children?: React.ReactNode }
>(props: P, childrenIsText = false): Partial<P> | false {
  const ref = useRef<P>(undefined);
  useEffect(() => {
    ref.current = props;
  });
  const modifiedProps = getModifiedProps(ref.current, props, childrenIsText);

  useDebugValue(modifiedProps ? 'Modified' : 'Not modified');

  return modifiedProps;
};

export default useModifiedProps;
