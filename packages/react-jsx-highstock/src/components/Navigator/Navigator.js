import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import {
  useModifiedProps,
  useChart,
  useHighcharts
} from 'react-jsx-highcharts';
import NavigatorXAxis from './NavigatorXAxis';

const Navigator = ({ enabled = true, children, ...restProps }) => {
  const props = { enabled, ...restProps };
  const renderedRef = useRef(false);
  const chart = useChart();
  const Highcharts = useHighcharts();
  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    return () => {
      attempt(updateNavigator, { enabled: false }, chart);
    };
  }, []);

  if (!renderedRef.current) {
    // Workaround from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    chartObj.options.navigator.enabled = true;
    // Initialise Navigator https://github.com/highcharts/highcharts/blob/dd730ab/js/parts/Navigator.js#L1837-L1844
    Highcharts.fireEvent(chartObj, 'beforeRender');

    updateNavigator(props, chart);
    renderedRef.current = true;
  } else {
    if (modifiedProps !== false) {
      updateNavigator(modifiedProps, chart);
    }
  }

  if (!children) return null;

  return <NavigatorXAxis>{children}</NavigatorXAxis>;
};

const updateNavigator = (config, chart) => {
  chart.update({ navigator: config }, true);
};

Navigator.propTypes = {
  enabled: PropTypes.bool
};

export default Navigator;
