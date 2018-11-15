import * as events from '../../src/utils/events';
import { Highcharts } from '../test-utils';

describe('utils/events', () => {

  beforeEach(() => {
    Highcharts.addEvent.mockClear();
  });

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
      }, true);
    });
  });

  describe('addEventHandlersManually', () => {
    const { addEventHandlersManually } = events;

    it('should call the Highcharts.addEvent for passed event handlers', () => {
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
      const context = {};

      addEventHandlersManually(Highcharts, context, config)

      expect(Highcharts.addEvent).toHaveBeenCalledWith(
        context, 'eventHandler', onEventHandler
      );
      expect(Highcharts.addEvent).toHaveBeenCalledWith(
        context, 'otherEventHandler', onOtherEventHandler
      );
      expect(Highcharts.addEvent).not.toHaveBeenCalledWith(
        context, 'onNotAFunction', 'trip'
      );
    });
    it('should not call the Highcharts.addEvent when props is undefined', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const context = {};

      addEventHandlersManually(Highcharts, context, undefined)

      expect(Highcharts.addEvent).not.toHaveBeenCalled();
    });
    it('should not call the Highcharts.addEvent when props is null', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const context = {};

      addEventHandlersManually(Highcharts, context, null)

      expect(Highcharts.addEvent).not.toHaveBeenCalled();
    });
  });
});
