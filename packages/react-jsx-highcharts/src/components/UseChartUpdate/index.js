import { useEffect } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';


const noop = c => c;

const useChartUpdate = (props, updateFn = noop, destroyfn, childrenIsText = true) => {
  const { getChart, needsRedraw } = useChart();

  const modifiedProps = useModifiedProps(props, childrenIsText);

  useEffect(()=> {
    if(modifiedProps !== false) {
      updateFn(getChart(), modifiedProps)
      needsRedraw();
    }
  });

  useEffect(()=> {
    return () => {
      attempt(destroyfn, getChart());
      needsRedraw();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
}


export default useChartUpdate;
