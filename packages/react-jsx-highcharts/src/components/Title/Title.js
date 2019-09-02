import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

const Title = memo((props) => {

  const { getChart, needsRedraw } = useChart();

  const modifiedProps = useModifiedProps(props, true);

  const updateTitle = config => {
    const chart = getChart();
    chart.setTitle(config, null, false);
    needsRedraw();
  }

  useEffect(() => {
    if (modifiedProps !== false) {
      updateTitle(modifiedProps);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);

  useEffect(() => {
    return () => attempt(updateTitle, { text: null });
  },[]);

  return null;
})

export default Title;
