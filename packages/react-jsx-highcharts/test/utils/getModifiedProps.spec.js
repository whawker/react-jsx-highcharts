import getModifiedProps from '../../src/utils/getModifiedProps';

describe('utils/getModifiedProps', () => {

  it('should return only modified props', () => {
    const prevProps = {
      firstProp: true,
      secondProp: true
    };

    const currProps = {
      firstProp: true,
      secondProp: false
    };

    const returnedProps = getModifiedProps(prevProps, currProps, false);
    expect(returnedProps).toEqual({ secondProp: false });

  });

  it('should return false for non modified props', () => {
    const prevProps = {
      firstProp: true,
      secondProp: true
    };

    const returnedProps = getModifiedProps(prevProps, prevProps, false);
    expect(returnedProps).toEqual(false);
  });

  it('should return modified props for undefined prevProps', () => {
    const prevProps = undefined;

    const currProps = {
      firstProp: true,
      secondProp: false
    };

    const returnedProps = getModifiedProps(prevProps, currProps, false);
    expect(returnedProps).toEqual(currProps);

  });

  it('should return modified props for null prevProps', () => {
    const prevProps = null;

    const currProps = {
      firstProp: true,
      secondProp: false
    };

    const returnedProps = getModifiedProps(prevProps, currProps, false);
    expect(returnedProps).toEqual(currProps);

  });
});

