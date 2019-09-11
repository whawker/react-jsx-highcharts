import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import {
  Hidden,
  useModifiedProps,
  useChart,
  useHighcharts
} from 'react-jsx-highcharts';

const MapNavigation = props => {
  const [rendered, setRendered] = useState(false);
  const chart = useChart();
  const Highcharts = useHighcharts();

  useEffect(() => {
    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    chartObj.options.mapNavigation.enabled = true;
    Highcharts.fireEvent(chartObj, 'beforeRender'); // Highcharts 6.1+

    const opts = getMapNavigationConfig(props, Highcharts);
    updateMapNavigation(opts, chart);

    setRendered(true);

    return () => {
      attempt(updateMapNavigation, { enabled: false }, chart);
    };
  }, []);

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if (!rendered) return;
    if (modifiedProps !== false) {
      updateMapNavigation(modifiedProps, chart);
    }
  });

  const { children } = this.props;
  if (!children || !rendered) return null;

  return <Hidden>{children}</Hidden>;
};
const getMapNavigationConfig = (props, Highcharts) => {
  const { children, ...rest } = props;

  return {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.mapNavigation),
    ...rest,
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
  enabled: PropTypes.bool.isRequired
};

MapNavigation.defaultProps = {
  enabled: true
};
export default MapNavigation;
