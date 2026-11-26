import { useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useModifiedProps from '../UseModifiedProps/index.ts';
import useAxis from '../UseAxis/index.ts';

import type {
  PlotLineContextValue,
  PlotBandContextValue
} from '../PlotBandLineContext/index.ts';
import type { PlotLineProps } from './PlotLine.tsx';
import type { PlotBandProps } from './PlotBand.tsx';

export default function usePlotBandLineLifecycle(
  props: PlotLineProps | PlotBandProps,
  plotType: 'plotBands' | 'plotLines'
) {
  // @ts-expect-error is axisId even needed?
  const { id = uuid, axisId, children, ...rest } = props;

  const axis = useAxis(axisId);
  const idRef = useRef<string>(undefined);
  const [plotbandline, setPlotbandline] = useState<
    PlotBandContextValue | PlotLineContextValue | null
  >(null);
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
      if (plotbandline) {
        if (plotType === 'plotBands') {
          // @ts-expect-error TODO
          axis.removePlotBand(idRef.current);
        } else if (plotType === 'plotLines') {
          // @ts-expect-error TODO
          axis.removePlotLine(idRef.current);
        }
      }

      if (plotType === 'plotBands') {
        axis.addPlotBand(opts);
      } else if (plotType === 'plotLines') {
        // @ts-expect-error TODO
        axis.addPlotLine(opts);
      }

      setPlotbandline({
        // @ts-expect-error TODO
        id: myId,
        get object() {
          /* when parent axis is updated, the plotlines and plotbands are recreated
             therefore the object can't be cached here
          */
          // @ts-expect-error TODO
          if (axis && axis.object && axis.object[plotType]) {
            // @ts-expect-error TODO
            return axis.object[plotType].find(plb => plb.id === myId);
          }
          return null;
        }
      });
    }
  });

  useEffect(() => {
    return () => {
      try {
        if (axis) {
          if (plotType === 'plotBands') {
            // @ts-expect-error TODO
            axis.removePlotBand(idRef.current);
          } else if (plotType === 'plotLines') {
            // @ts-expect-error TODO
            axis.removePlotLine(idRef.current);
          }
        }
      } catch {
        // ignore as axis might have been already unmounted
      }
    };
  }, []);

  return plotbandline;
}
