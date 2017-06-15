import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class Title extends Component {

  static propTypes = {
    update: PropTypes.func // Provided by ChartProvider
  };

  constructor (props) {
    super(props);

    this.updateTitle = this.updateTitle.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateTitle({
      ...rest,
      useHTML: true,
      text: children
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateTitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateTitle({
      text: null
    });
  }

  updateTitle (config) {
    this.props.update({
      title: config
    }, true);
  }

  render () {
    return null
  }
}

export default Title;
