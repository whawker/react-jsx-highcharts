import { mapKeys, lowerFirst } from 'lodash-es';
import pickBy from './pickBy';

export const getEventHandlerProps  = props => {
  return pickBy(props, _isEventKey);
};

export const getNonEventHandlerProps = props => {
  return pickBy(props, (key, value) => !_isEventKey(key, value));
};

export const getEventsConfig = props => {
  const eventProps = getEventHandlerProps(props);

  return mapKeys(eventProps, (handler, eventName) => {
    return lowerFirst(eventName.replace(/^on/, ''));
  });
}

export const addEventHandlersManually = (Highcharts, context, props) => {
  const eventProps = getEventsConfig(props);

  Object.keys(eventProps).forEach((eventName) => {
    Highcharts.addEvent(context, eventName, eventProps[eventName]);
  });
};

export const addEventHandlers = (updateFn, props, redraw = true) => {
  const events = getEventsConfig(props);
  updateFn({ events }, redraw);
};

const _isEventKey = (key, value) => (key.indexOf('on') === 0) && typeof value === 'function';

export default addEventHandlers;
