const noop = () => {};

export default function getBoundChartMethod(chart, method, context) {
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

export const boundContextHelper = (chart, context) => method => {
  return getBoundChartMethod(chart, method, context);
}
