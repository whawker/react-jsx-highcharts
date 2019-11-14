import React, {
  useState,
  useEffect,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';
import NavigatorXAxis from './NavigatorXAxis';

const Navigator = ({ enabled = true, ...restProps }) => {
  const props = { enabled, ...restProps };
  const [rendered, setRendered] = useState(false);
  const chart = useChart();

  useEffect(() => {
    const { children, ...rest } = props;

    updateNavigator(rest, chart);

    setRendered(true);

    return () => {
      attempt(updateNavigator, { enabled: false }, chart);
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

  const navChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    return cloneElement(child, { rendered });
  });

  return <NavigatorXAxis>{navChildren}</NavigatorXAxis>;
};

const updateNavigator = (config, chart) => {
  chart.update({ navigator: config }, true);
};

Navigator.propTypes = {
  enabled: PropTypes.bool
};

export default Navigator;
