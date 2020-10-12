import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useModifiedProps,
  useChart,
  useHighcharts
} from 'react-jsx-highcharts';
import NavigatorXAxis from './NavigatorXAxis';

const Navigator = ({ enabled = true, ...restProps }) => {
  const props = { enabled, ...restProps };
  const [rendered, setRendered] = useState(false);
  const chart = useChart();
  const Highcharts = useHighcharts();

  useEffect(() => {
    const { children, ...rest } = props;
    // Workaround from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    chartObj.options.navigator.enabled = true;
    // Initialise Navigator https://github.com/highcharts/highcharts/blob/dd730ab/js/parts/Navigator.js#L1837-L1844
    Highcharts.fireEvent(chartObj, 'beforeRender');

    updateNavigator(rest, chart);

    setRendered(true);

    return () => {
      try {
        updateNavigator({ enabled: false }, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateNavigator(modifiedProps, chart);
    }
  });

  const { children } = props;
  if (!children || !rendered) return null;

  return <NavigatorXAxis>{children}</NavigatorXAxis>;
};

const updateNavigator = (config, chart) => {
  chart.update({ navigator: config }, true);
};

Navigator.propTypes = {
  enabled: PropTypes.bool
};

export default Navigator;
