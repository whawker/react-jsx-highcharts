import { useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useModifiedProps from '../UseModifiedProps';
import useAxis from '../UseAxis';

import type { PlotBandLineContextValue } from '../PlotBandLineContext';

// @ts-expect-error TODO
export default function usePlotBandLineLifecycle(props, plotType) {
  const { id = uuid, axisId, children, ...rest } = props;

  const axis = useAxis(axisId);
  const idRef = useRef<string>(undefined);
  const [plotbandline, setPlotbandline] =
    useState<PlotBandLineContextValue | null>(null);
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
      // @ts-expect-error TODO
      if (plotbandline) axis.removePlotBandOrLine(idRef.current);
      axis.addPlotBandOrLine(opts, plotType);
      setPlotbandline({
        // @ts-expect-error TODO
        id: myId,
        get object() {
          /* when parent axis is updated, the plotlines and plotbands are recreated
             therefore the object can't be cached here
          */
          // @ts-expect-error TODO
          if (axis && axis.object && axis.object.plotLinesAndBands) {
            // @ts-expect-error TODO
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
        // @ts-expect-error TODO
        if (axis) axis.removePlotBandOrLine(idRef.current);
      } catch {
        // ignore as axis might have been already unmounted
      }
    };
  }, []);

  return plotbandline;
}
