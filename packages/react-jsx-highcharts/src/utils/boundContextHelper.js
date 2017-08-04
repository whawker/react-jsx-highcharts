const noop = () => {};

function getBoundChartMethod (chart, method, context) {
  if (!method) {
    return noop;
  }

  const boundMethod = method.bind(context);

  return function (...args) {
    if (!chart.__destroyed) {
      return boundMethod(...args)
    }

    return null;
  }
}

const boundContextHelper = (chart, context) => method => {
  return getBoundChartMethod(chart, method, context);
};

export default boundContextHelper;
