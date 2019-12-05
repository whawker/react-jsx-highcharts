import pickBy from './pickBy';

export const getEventHandlerProps = props => {
  return pickBy(props, _isEventKey);
};

export const getNonEventHandlerProps = props => {
  return pickBy(props, (key, value) => !_isEventKey(key, value));
};

export const getEventsConfig = props => {
  const eventProps = getEventHandlerProps(props);
  const eventsConfig = {};

  Object.keys(eventProps).forEach(eventName => {
    const configName = eventName.slice(2)[0].toLowerCase() + eventName.slice(3);
    eventsConfig[configName] = eventProps[eventName];
  });

  return eventsConfig;
};

const _isEventKey = (key, value) =>
  key.indexOf('on') === 0 && key.length > 2 && typeof value === 'function';
