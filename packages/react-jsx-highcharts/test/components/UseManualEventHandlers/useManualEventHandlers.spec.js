import * as React from 'react';
import { render } from '@testing-library/react';

import useManualEventHandlers from '../../../src/components/UseManualEventHandlers';

import { Highcharts } from '../../test-utils';
import HighchartContext from '../../../src/components/HighchartsContext';

describe('useManualEventHandlers', () => {
  let ProvidedComponent;
  let target;

  beforeEach(() => {
    target = new Object();
    const Component = props => {
      useManualEventHandlers(props, target);
      return <div />;
    };
    ProvidedComponent = props => (
      <HighchartContext.Provider value={Highcharts}>
        <Component {...props} />
      </HighchartContext.Provider>
    );
  });

  afterEach(() => {
    Highcharts.removeEvent.mockClear();
    Highcharts.addEvent.mockClear();
  });

  describe('when mounted', () => {
    it('should call the Highcharts.addEvent', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();

      const props = {
        enabled: true,
        onEventHandler,
        onOtherEventHandler,
        onNotAFunction: 'trip',
        something: 'stringy',
        count: 14
      };

      render(<ProvidedComponent {...props} />);

      expect(Highcharts.removeEvent).not.toHaveBeenCalled();
      expect(Highcharts.addEvent).toHaveBeenCalledWith(
        target,
        'eventHandler',
        onEventHandler
      );
      expect(Highcharts.addEvent).toHaveBeenCalledWith(
        target,
        'otherEventHandler',
        onOtherEventHandler
      );
      expect(Highcharts.addEvent).not.toHaveBeenCalledWith(
        target,
        'onNotAFunction',
        'trip'
      );
    });

    it('should not call the Highcharts.addEvent when props is undefined', () => {
      render(<ProvidedComponent />);

      expect(Highcharts.addEvent).not.toHaveBeenCalled();
    });
  });

  describe('when updated', () => {
    it('should call the Highcharts.removeEvent and addEvent with changed handlers', () => {
      const onEventHandler = jest.fn();
      const onOtherEventHandler = jest.fn();
      const onThirdEventHandler = jest.fn();
      const props = {
        onEventHandler,
        onOtherEventHandler,
        onThirdEventHandler
      };

      const wrapper = render(<ProvidedComponent {...props} />);
      Highcharts.addEvent.mockClear();
      Highcharts.removeEvent.mockClear();
      const onNewOtherEventHandler = jest.fn();

      const updatedProps = {
        onEventHandler,
        onOtherEventHandler: onNewOtherEventHandler
      };
      wrapper.rerender(<ProvidedComponent {...props} {...updatedProps} />);

      expect(Highcharts.removeEvent).not.toHaveBeenCalledWith(
        target,
        'eventHandler',
        onEventHandler
      );
      expect(Highcharts.addEvent).not.toHaveBeenCalledWith(
        target,
        'eventHandler',
        onEventHandler
      );

      expect(Highcharts.removeEvent).toHaveBeenCalledWith(
        target,
        'otherEventHandler',
        onOtherEventHandler
      );
      expect(Highcharts.addEvent).toHaveBeenCalledWith(
        target,
        'otherEventHandler',
        onNewOtherEventHandler
      );
      /* TODO removing eventhandlers completely fails.
      expect(Highcharts.removeEvent).toHaveBeenCalledWith(
        target,
        'thirdEventHandler',
        onThirdEventHandler
      );
    */
    });
  });
});
