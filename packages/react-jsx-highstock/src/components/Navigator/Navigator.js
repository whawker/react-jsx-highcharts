import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';
import NavigatorXAxis from './NavigatorXAxis';

const Navigator = ({ children = null, enabled = true, ...restProps }) => {
  const props = { enabled, ...restProps };
  const chart = useChart();

  useEffect(() => {
    return () => {
      attempt(updateNavigator, { enabled: false }, chart);
    };
  }, []);

  const modifiedProps = useModifiedProps(props);

  if (modifiedProps !== false) {
    updateNavigator(modifiedProps, chart);
  }

  if (!children || !enabled) return null;

  return <NavigatorXAxis>{children}</NavigatorXAxis>;
};

const updateNavigator = (config, chart) => {
  chart.update({ navigator: config }, true);
};

Navigator.propTypes = {
  enabled: PropTypes.bool,
  children: PropTypes.node
};

export default Navigator;
