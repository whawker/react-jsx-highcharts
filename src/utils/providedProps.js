import forEach from 'lodash/forEach';

const propsMap = {};

export default function addProvidedProps (name, props) {
  propsMap[name] = props;
}

export const getProvidedProps = () => {
  const combined = [];
  forEach(propsMap, props => {
    Array.prototype.push.apply(combined, props);
  });

  return combined;
};
