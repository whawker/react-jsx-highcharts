const noop = () => {};

function getBoundChartMethod (chart, getContext, method) {
  if (!method) return noop;

  return function (...args) {
    const context = getContext();
    if (!context || !context[method]) return noop;

    const func = context[method];
    if (!chart.__destroyed) {
      return func.apply(context, args)
    }

    return null;
  }
}

const boundContextHelper = (chart, getContext) => method => {
  return getBoundChartMethod(chart, getContext, method);
};

export default boundContextHelper;
