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

  it('should return added props', () => {
    const prevProps = {
      firstProp: true
    };

    const currProps = {
      secondProp: false
    };

    const returnedProps = getModifiedProps(prevProps, currProps, false);
    expect(returnedProps).toEqual({ secondProp: false });
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
  it('should not return text when children is not defined', () => {
    const prevProps = null;

    const currProps = {
      a: 1
    };

    const returnedProps = getModifiedProps(prevProps, currProps, true);
    expect(returnedProps.text).not.toBeDefined();
    expect(returnedProps.a).toBe(1);
  });

  it('should return text when children changes', () => {
    const prevProps = {};

    const currProps = {
      children: 'teststring'
    };

    const returnedProps = getModifiedProps(prevProps, currProps, true);
    expect(returnedProps.text).toBe('teststring');
  });
});
