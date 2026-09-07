import pickBy from './pickBy';

/**
 *
 * @private
 */
export const getEventHandlerProps = <P extends Record<string, unknown>>(
  props: P
) => {
  // @ts-expect-error TODO
  return pickBy(props, _isEventKey);
};

/**
 *
 * @private
 */
export const getNonEventHandlerProps = <P extends Record<string, unknown>>(
  props: P
) => {
  // @ts-expect-error TODO
  return pickBy(props, (key, value) => !_isEventKey(key, value));
};

/**
 *
 * @private
 */
export const getEventsConfig = <P extends Record<string, unknown>>(
  props: P
) => {
  const eventProps = getEventHandlerProps(props);
  const eventsConfig: Record<string, unknown> = {};

  Object.keys(eventProps).forEach(eventName => {
    const configName = eventName.slice(2)[0].toLowerCase() + eventName.slice(3);
    eventsConfig[configName] = eventProps[eventName];
  });

  return eventsConfig;
};

const _isEventKey = (key: string, value: unknown) =>
  key.indexOf('on') === 0 && key.length > 2 && typeof value === 'function';
