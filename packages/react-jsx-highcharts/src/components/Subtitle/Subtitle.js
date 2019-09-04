import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

const Subtitle = memo((props) => {

  const { getChart, needsRedraw } = useChart();

  const modifiedProps = useModifiedProps(props, true);

  const updateSubtitle = config => {
    const chart = getChart();
    chart.setTitle(undefined, config, false);
    needsRedraw();
  }

  useEffect(() => {
    if (modifiedProps !== false) {
      updateSubtitle(modifiedProps);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);

  useEffect(() => {
    return () => attempt(updateSubtitle, { text: null });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
})

Subtitle.displayName = 'Subtitle';

export default Subtitle;
