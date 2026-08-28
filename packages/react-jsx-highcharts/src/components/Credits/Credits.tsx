import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { CreditsOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';
type CreditProps = {
  children?: ReactNode;
} & Partial<Omit<CreditsOptions, 'text'>>;
const Credits = ({ enabled = true, ...restProps }: CreditProps) => {
  useChartUpdate({ enabled, ...restProps }, updateCredits, chart =>
    updateCredits(chart, { enabled: false })
  );

  return null;
};

const updateCredits = (
  chart: ChartContextValue,
  config: Partial<CreditsOptions>
) => {
  // Use default Highcharts value if text is not explicitly set
  if ('text' in config && !config.text) delete config.text;
  // @ts-expect-error addCredits second argument?
  chart.addCredits(config, true);
};

export default Credits;
