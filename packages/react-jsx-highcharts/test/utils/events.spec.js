import * as events from '../../src/utils/events';

describe('utils/events', () => {
  describe('getEventHandlerProps', () => {
    const { getEventHandlerProps } = events;

    it('should return all props that look like an event handler', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getEventHandlerProps(config)).toEqual({
        onEventHandler,
        onOtherEventHandler
      });
    });
  });

  describe('getNonEventHandlerProps', () => {
    const { getNonEventHandlerProps } = events;

    it('should return all props that don\'t look like an event handler', () => {
      const config = {
        enabled: true,
        onEventHandler: jest.fn(),
        onOtherEventHandler: jest.fn(),
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getNonEventHandlerProps(config)).toEqual({
        enabled: true,
        something: 'stringy',
        onNotAFunction: 'trip',
        count: 14
      });
    });
  });

  describe('getEventsConfig', () => {
    const { getEventsConfig } = events;

    it('should return all props that look like an event handler, without the `on` prefix', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getEventsConfig(config)).toEqual({
        eventHandler: onEventHandler,
        otherEventHandler: onOtherEventHandler
      });
    });
  });

  describe('addEventHandlers', () => {
    const { addEventHandlers } = events;

    it('should call the provided function with an events property with things that look like event handlers', () => {
      const spy = jest.fn();
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }
      addEventHandlers(spy, config)

      expect(spy).toHaveBeenCalledWith({
        events: {
          eventHandler: onEventHandler,
          otherEventHandler: onOtherEventHandler
        }
      });
    });
  });
});
