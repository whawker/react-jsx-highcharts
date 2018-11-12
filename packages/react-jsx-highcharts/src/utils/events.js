import { lowerFirst } from 'lodash-es';
import { pickBy } from 'lodash-es';
import { omitBy } from 'lodash-es';
import { mapKeys } from 'lodash-es';

export const getEventHandlerProps  = props => {
  return pickBy(props, _isEventKey);
};

export const getNonEventHandlerProps = props => {
  return omitBy(props, _isEventKey);
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

const _isEventKey = (value, key) => (key.indexOf('on') === 0) && typeof value === 'function';

export default addEventHandlers;
