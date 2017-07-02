import Highcharts from 'highstock-release';
import forEach from 'lodash.foreach';
import lowerFirst from 'lodash.lowerfirst';
import pickBy from 'lodash.pickby';
import omitBy from 'lodash.omitby';

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

const isEventKey = (value, key) => key.indexOf('on') === 0;

export default addEventHandlers;
