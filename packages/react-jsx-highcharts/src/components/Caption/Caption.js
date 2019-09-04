import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

const Caption = memo((props) => {

  const { getChart, needsRedraw } = useChart();

  const modifiedProps = useModifiedProps(props, true);

  const updateCaption = config => {
    const chart = getChart();
    chart.setCaption(config, null, false);
    needsRedraw();
  }

  useEffect(() => {
    if (modifiedProps !== false) {
      updateCaption(modifiedProps);
    }
  });

  useEffect(() => {
    return () => attempt(updateCaption, { text: null });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
})

Caption.displayName = 'Caption';

export default Caption;
