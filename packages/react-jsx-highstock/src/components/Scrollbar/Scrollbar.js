import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';

const Scrollbar = ({ children, enabled = true, ...restProps }) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      try {
        updateScrollbar({ enabled: false }, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (modifiedProps !== false) {
      updateScrollbar(modifiedProps, chart);
    }
  });

  if (!children) return null;

  return <>{children}</>;
};

const updateScrollbar = (config, chart) => {
  chart.update({ scrollbar: config }, true);
};

Scrollbar.propTypes = {
  enabled: PropTypes.bool
};

export default Scrollbar;
