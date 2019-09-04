import { useEffect, memo } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

const Pane = memo((props) => {
  const { getChart, needsRedraw } = useChart();


  const modifiedProps = useModifiedProps(props);

  useEffect(()=> {
    if (modifiedProps !== false) {
      updatePane(modifiedProps, getChart(), needsRedraw);
    }
  })

  useEffect(() => {
    return () => attempt(updatePane, {}, getChart(), needsRedraw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
})

const updatePane = (config, chart, needsRedraw) => {
  chart.update({
    pane: config
  }, false);
  needsRedraw();
}
Pane.displayName = 'Pane';

export default Pane;
