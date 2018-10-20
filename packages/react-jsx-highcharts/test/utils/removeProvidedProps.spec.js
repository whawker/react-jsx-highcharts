import clean from '../../src/utils/removeProvidedProps';

describe('utils/removeProvidedProps', () => {
  it('should return a function that cleans config before passing to wrapped function', () => {
    const spy = jest.fn();
    const cleanedSpy = clean(spy);

    cleanedSpy({
      enabled: true,
      text: 'something',
      steps: 12,
      nested: {
        property: 'value'
      },
      getHighcharts: jest.fn(),
      getChart: jest.fn(),
      getAxis: jest.fn(),
      getSeries: jest.fn()
    });

    expect(spy).toHaveBeenCalledWith({
      enabled: true,
      text: 'something',
      steps: 12,
      nested: {
        property: 'value'
      }
    });
  });

  it('should return a function that deeply cleans config before passing to wrapped function', () => {
    const spy = jest.fn();
    const cleanedSpy = clean(spy);

    const onEventHandler = jest.fn();
    cleanedSpy({
      enabled: false,
      text: 'something else',
      onEventHandler,
      nested: {
        property: 'value',
        getHighcharts: jest.fn(),
        getChart: jest.fn(),
        getAxis: jest.fn(),
        getSeries: jest.fn()
      }
    });

    expect(spy).toHaveBeenCalledWith({
      enabled: false,
      text: 'something else',
      onEventHandler,
      nested: {
        property: 'value'
      }
    });
  });

  it('should return a function that really deeply cleans config before passing to wrapped function', () => {
    const spy = jest.fn();
    const cleanedSpy = clean(spy);

    cleanedSpy({
      text: 'the third',
      steps: 12,
      nested: {
        property: 'value',
        deeply: {
          value: Math.PI,
          getHighcharts: jest.fn(),
          getChart: jest.fn(),
          getAxis: jest.fn(),
          getSeries: jest.fn()
        }
      }
    });

    expect(spy).toHaveBeenCalledWith({
      text: 'the third',
      steps: 12,
      nested: {
        property: 'value',
        deeply: {
          value: Math.PI
        }
      }
    });
  });

  it('should return a function that passes additional arguments to the original function', () => {
    const spy = jest.fn();
    const cleanedSpy = clean(spy);

    cleanedSpy(
      {
        enabled: false,
        getHighcharts: jest.fn(),
        getChart: jest.fn(),
        getAxis: jest.fn(),
        getSeries: jest.fn()
      },
      true,
      { option: 'never' }
    );

    expect(spy).toHaveBeenCalledWith({ enabled: false }, true, { option: 'never' });
  });
});
