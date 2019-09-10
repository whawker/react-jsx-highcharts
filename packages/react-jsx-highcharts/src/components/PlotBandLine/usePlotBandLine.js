import React, { useRef, useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import useModifiedProps from '../UseModifiedProps';
import useAxis from '../UseAxis';

export default function usePlotBandLine(props, plotType) {
  const { id = uuid, children, ...rest } = props;

  const getAxis = useAxis();
  const idRef = useRef();
  const [plotbandline, setPlotbandline] = useState(null);
  const modifiedProps = useModifiedProps(rest);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!getAxis) return;
    if (modifiedProps !== false && plotbandline) {
      const axis = getAxis();
      axis.removePlotLine(idRef.current);
      const opts = {
        id: idRef.current,
        ...modifiedProps
      };
      setPlotbandline(axis.addPlotBandOrLine(opts, plotType));
    }
  });

  // create plotline
  useEffect(() => {
    if (!getAxis) return;
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const opts = {
      id: myId,
      ...rest
    };
    const axis = getAxis();
    setPlotbandline(axis.addPlotBandOrLine(opts, plotType));

    return () => {
      const axis = getAxis();
      attempt(axis.removePlotBandOrLine, idRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAxis]);

  return plotbandline;
}
