import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class Subtitle extends Component {

  static propTypes = {
    update: PropTypes.func
  };

  constructor (props) {
    super(props);

    this.updateSubtitle = this.updateSubtitle.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateSubtitle({
      ...rest,
      useHTML: true,
      text: children
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateSubtitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateSubtitle({
      text: null
    });
  }

  updateSubtitle (config) {
    this.props.update({
      subtitle: config
    }, true);
  }

  render () {
    return null
  }
}

export default Subtitle;
