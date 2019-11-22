import * as events from '../../src/utils/events';
import { Highcharts } from '../test-utils';

describe('utils/events', () => {
  beforeEach(() => {
    Highcharts.addEvent.mockClear();
    Highcharts.removeEvent.mockClear();
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
      };

      expect(getEventHandlerProps(config)).toEqual({
        onEventHandler,
        onOtherEventHandler
      });
    });
  });

  describe('getNonEventHandlerProps', () => {
    const { getNonEventHandlerProps } = events;

    it("should return all props that don't look like an event handler", () => {
      const config = {
        enabled: true,
        onEventHandler: jest.fn(),
        onOtherEventHandler: jest.fn(),
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      };

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
      };

      expect(getEventsConfig(config)).toEqual({
        eventHandler: onEventHandler,
        otherEventHandler: onOtherEventHandler
      });
    });
  });
});
