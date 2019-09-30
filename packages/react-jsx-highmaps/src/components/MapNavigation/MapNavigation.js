import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import {
  useModifiedProps,
  useChart,
  useHighcharts
} from 'react-jsx-highcharts';

const MapNavigation = ({ children, enabled = true, ...restProps }) => {
  const [rendered, setRendered] = useState(false);
  const chart = useChart();
  const Highcharts = useHighcharts();

  useEffect(() => {
    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    chartObj.options.mapNavigation.enabled = true;
    // Initialise MapNavigation https://github.com/highcharts/highcharts/blob/dd730ab/js/parts-map/MapNavigation.js#L288-L294
    Highcharts.fireEvent(chartObj, 'beforeRender');

    const opts = getMapNavigationConfig({ enabled, ...restProps }, Highcharts);
    updateMapNavigation(opts, chart);

    setRendered(true);

    return () => {
      attempt(updateMapNavigation, { enabled: false }, chart);
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (!rendered) return;
    if (modifiedProps !== false) {
      updateMapNavigation(modifiedProps, chart);
    }
  });

  if (!children || !rendered) return null;

  return <>{children}</>;
};
const getMapNavigationConfig = (props, Highcharts) => {
  return {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.mapNavigation),
    ...props,
    enableButtons: false,
    buttons: {
      zoomIn: {},
      zoomOut: {}
    }
  };
};

const updateMapNavigation = (config, chart) => {
  chart.update(
    {
      mapNavigation: config
    },
    true
  );
};

MapNavigation.propTypes = {
  enabled: PropTypes.bool
};

export default MapNavigation;
