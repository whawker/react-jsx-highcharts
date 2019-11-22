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

  Object.entries(eventProps).forEach(([eventName, value]) => {
    const configName = eventName.slice(2)[0].toLowerCase() + eventName.slice(3);
    eventsConfig[configName] = value;
  });

  return eventsConfig;
};

const _isEventKey = (key, value) =>
  key.indexOf('on') === 0 && key.length > 2 && typeof value === 'function';
