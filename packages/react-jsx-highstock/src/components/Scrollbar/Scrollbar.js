import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { Hidden, useModifiedProps, useChart } from 'react-jsx-highcharts';

const Scrollbar = ({ children, ...restProps}) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      attempt(updateScrollbar, { enabled: false }, chart);
    }
  }, []);

  const modifiedProps = useModifiedProps(restProps);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateScrollbar(modifiedProps, chart);
    }
  });

  if (!children) return null;

  return (
    <Hidden>{children}</Hidden>
  );
}

const updateScrollbar = (config, chart) => {
  chart.update({
    scrollbar: config
  }, true);
}

Scrollbar.propTypes = {
  enabled: PropTypes.bool.isRequired
};

Scrollbar.defaultProps = {
  enabled: true
};

export default Scrollbar;
