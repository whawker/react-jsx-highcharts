import Highcharts from 'highcharts';
import forEach from 'lodash/forEach';
import lowerFirst from 'lodash/lowerFirst';
import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import isFunction from 'lodash/isFunction';

export const getEventHandlerProps  = props => {
  return pickBy(props, isEventKey);
};

export const getNonEventHandlerProps = props => {
  return omitBy(props, isEventKey);
};

export const addEventHandlers = (context, props) => {
  const eventProps = getEventHandlerProps(props);

  forEach(eventProps, (handler, eventName) => {
    const highchartsEventName = lowerFirst(eventName.replace(/^on/, ''));
    Highcharts.addEvent(context, highchartsEventName, handler);
  });
};

const isEventKey = (value, key) => (key.indexOf('on') === 0) && isFunction(value);

export default addEventHandlers;
