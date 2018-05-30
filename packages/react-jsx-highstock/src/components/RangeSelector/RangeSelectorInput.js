import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import mapKeys from 'lodash/mapKeys';
import upperFirst from 'lodash/upperFirst';
import { getModifiedProps } from 'react-jsx-highcharts';

class RangeSelectorInput extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateRangeSelectorInputs(rest);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelectorInputs(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateRangeSelectorInputs, { enabled: false });
  }

  prefixPropsWithInput = config => {
    return mapKeys(config, (value, key) => {
      return key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
    });
  }

  updateRangeSelectorInputs = config => {
    const chart = this.props.getChart();
    const inputProps = this.prefixPropsWithInput(config);

    chart.update({
      rangeSelector: {
        ...inputProps
      }
    });
  }

  render () {
    return null;
  }
}

export default RangeSelectorInput;
