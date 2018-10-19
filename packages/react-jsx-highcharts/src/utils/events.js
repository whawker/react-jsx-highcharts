import { forEach } from 'lodash-es';
import { lowerFirst } from 'lodash-es';
import { pickBy } from 'lodash-es';
import { omitBy } from 'lodash-es';
import { mapKeys } from 'lodash-es';
import { isFunction } from 'lodash-es';

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

  forEach(eventProps, (handler, eventName) => {
    Highcharts.addEvent(context, eventName, handler);
  });
};

export const addEventHandlers = (updateFn, props) => {
  const events = getEventsConfig(props);
  updateFn({ events });
};

const _isEventKey = (value, key) => (key.indexOf('on') === 0) && isFunction(value);

export default addEventHandlers;
