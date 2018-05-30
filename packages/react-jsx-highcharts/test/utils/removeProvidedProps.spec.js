import clean from '../../src/utils/removeProvidedProps';

describe('utils/removeProvidedProps', function () {
  it('should return a function that cleans config before passing to wrapped function', function () {
    const spy = sinon.spy();
    const cleanedSpy = clean(spy);

    cleanedSpy({
      enabled: true,
      text: 'something',
      steps: 12,
      nested: {
        property: 'value'
      },
      getHighcharts: sinon.spy(),
      getChart: sinon.spy(),
      getAxis: sinon.spy(),
      getSeries: sinon.spy()
    });

    expect(spy).to.have.been.calledWithExactly({
      enabled: true,
      text: 'something',
      steps: 12,
      nested: {
        property: 'value'
      }
    });
  });

  it('should return a function that deeply cleans config before passing to wrapped function', function () {
    const spy = sinon.spy();
    const cleanedSpy = clean(spy);

    const onEventHandler = sinon.spy();
    cleanedSpy({
      enabled: false,
      text: 'something else',
      onEventHandler,
      nested: {
        property: 'value',
        getHighcharts: sinon.spy(),
        getChart: sinon.spy(),
        getAxis: sinon.spy(),
        getSeries: sinon.spy()
      }
    });

    expect(spy).to.have.been.calledWithExactly({
      enabled: false,
      text: 'something else',
      onEventHandler,
      nested: {
        property: 'value'
      }
    });
  });

  it('should return a function that really deeply cleans config before passing to wrapped function', function () {
    const spy = sinon.spy();
    const cleanedSpy = clean(spy);

    cleanedSpy({
      text: 'the third',
      steps: 12,
      nested: {
        property: 'value',
        deeply: {
          value: Math.PI,
          getHighcharts: sinon.spy(),
          getChart: sinon.spy(),
          getAxis: sinon.spy(),
          getSeries: sinon.spy()
        }
      }
    });

    expect(spy).to.have.been.calledWithExactly({
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

  it('should return a function that passes additional arguments to the original function', function () {
    const spy = sinon.spy();
    const cleanedSpy = clean(spy);

    cleanedSpy(
      {
        enabled: false,
        getHighcharts: sinon.spy(),
        getChart: sinon.spy(),
        getAxis: sinon.spy(),
        getSeries: sinon.spy()
      },
      true,
      { option: 'never' }
    );

    expect(spy).to.have.been.calledWithExactly({ enabled: false }, true, { option: 'never' });
  });
});
