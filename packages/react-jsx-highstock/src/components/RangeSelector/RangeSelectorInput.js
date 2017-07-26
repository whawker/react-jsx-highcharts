import { Component } from 'react';
import PropTypes from 'prop-types';
import mapKeys from 'lodash/mapKeys';
import upperFirst from 'lodash/upperFirst';
import getModifiedProps from 'react-jsx-highcharts/src/utils/getModifiedProps';

class RangeSelectorInput extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  constructor (props) {
    super(props);

    this.updateRangeSelectorInputs = this.updateRangeSelectorInputs.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateRangeSelectorInputs({
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelectorInputs(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateRangeSelectorInputs({
      enabled: false
    });
  }

  updateRangeSelectorInputs (config) {
    const inputProps = mapKeys(config, (value, key) => {
      return key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
    });

    this.props.update({
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
