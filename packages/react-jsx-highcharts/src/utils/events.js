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

export const addEventHandlersManually = (Highcharts, context, props) => {
  const eventProps = getEventsConfig(props);

  Object.keys(eventProps).forEach(eventName => {
    Highcharts.removeEvent(context, eventName);
    Highcharts.addEvent(context, eventName, eventProps[eventName]);
  });
};

export const addEventHandlers = (updateFn, props, redraw = true) => {
  const events = getEventsConfig(props);
  updateFn({ events }, redraw);
};

const _isEventKey = (key, value) =>
  key.indexOf('on') === 0 && key.length > 2 && typeof value === 'function';

export default addEventHandlers;
