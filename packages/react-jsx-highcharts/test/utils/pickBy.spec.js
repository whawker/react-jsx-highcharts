import pickBy from '../../src/utils/pickBy';

describe('utils/pickBy', () => {
  it('should return object which satisfies filter function', () => {
    const onInit = jest.fn();
    const props = {
      onInit,
      noPassed: false
    };
    const pickedProps = pickBy(props, (key, value) => {
      return key === 'onInit';
    });

    expect(pickedProps).toEqual({ onInit });
  });

  it('should return empty object for undefined object', () => {
    const pickedProps = pickBy(undefined, (key, value) => {
      return key === 'onInit';
    });

    expect(pickedProps).toEqual({});
  });
});
