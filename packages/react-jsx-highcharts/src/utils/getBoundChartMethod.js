export default function getBoundChartMethod(chart, method, context) {
  const boundMethod = method.bind(context);

  return function (...rest) {
    if (!chart.__destroyed) {
      return boundMethod(...rest)
    }

    return null;
  }
}
