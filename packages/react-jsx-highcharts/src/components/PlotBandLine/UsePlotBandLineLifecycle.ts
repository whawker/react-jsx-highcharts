import { useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useModifiedProps from '../UseModifiedProps';
import useAxis from '../UseAxis';

export default function usePlotBandLineLifecycle(props, plotType) {
  const { id = uuid, axisId, children, ...rest } = props;

  const axis = useAxis(axisId);
  const idRef = useRef();
  const [plotbandline, setPlotbandline] = useState(null);
  const modifiedProps = useModifiedProps(rest);

  useEffect(() => {
    if (!axis) return;
    if (!plotbandline || modifiedProps !== false) {
      if (!plotbandline) {
        idRef.current = typeof id === 'function' ? id() : id;
      }
      const myId = idRef.current;
      const opts = {
        id: myId,
        ...rest
      };

      if (plotbandline) axis.removePlotBandOrLine(idRef.current);
      axis.addPlotBandOrLine(opts, plotType);
      setPlotbandline({
        id: myId,
        get object() {
          /* when parent axis is updated, the plotlines and plotbands are recreated
             therefore the object can't be cached here
          */
          if (axis && axis.object && axis.object.plotLinesAndBands) {
            return axis.object.plotLinesAndBands.find(plb => plb.id === myId);
          }
          return null;
        }
      });
    }
  });

  useEffect(() => {
    return () => {
      try {
        axis.removePlotBandOrLine(idRef.current);
      } catch {
        // ignore as axis might have been already unmounted
      }
    };
  }, []);

  return plotbandline;
}
