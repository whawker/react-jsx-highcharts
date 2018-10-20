import * as events from '../../src/utils/events';

describe('utils/events', () => {
  describe('getEventHandlerProps', () => {
    const { getEventHandlerProps } = events;

    it('should return all props that look like an event handler', () => {
      const onEventHandler = sinon.spy();
      const onOtherEventHandler = sinon.spy();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getEventHandlerProps(config)).to.deep.equal({
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
        onEventHandler: sinon.spy(),
        onOtherEventHandler: sinon.spy(),
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getNonEventHandlerProps(config)).to.deep.equal({
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
      const onEventHandler = sinon.spy();
      const onOtherEventHandler = sinon.spy();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }

      expect(getEventsConfig(config)).to.deep.equal({
        eventHandler: onEventHandler,
        otherEventHandler: onOtherEventHandler
      });
    });
  });

  describe('addEventHandlers', () => {
    const { addEventHandlers } = events;

    it('should call the provided function with an events property with things that look like event handlers', () => {
      const spy = sinon.spy();
      const onEventHandler = sinon.spy();
      const onOtherEventHandler = sinon.spy();

      const config = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      }
      addEventHandlers(spy, config)

      expect(spy).to.have.been.calledWithExactly({
        events: {
          eventHandler: onEventHandler,
          otherEventHandler: onOtherEventHandler
        }
      });
    });
  });
});
