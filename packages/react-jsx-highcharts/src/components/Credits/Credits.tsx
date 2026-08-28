import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { CreditsOptions } from 'highcharts';

type CreditProps = {
  children?: ReactNode;
} & Partial<Omit<CreditsOptions, 'text'>>;
const Credits = ({ enabled = true, ...restProps }: CreditProps) => {
  useChartUpdate({ enabled, ...restProps }, updateCredits, chart =>
    updateCredits(chart, { enabled: false })
  );

  return null;
};

// @ts-expect-error TODO
const updateCredits = (chart, config) => {
  // Use default Highcharts value if text is not explicitly set
  if ('text' in config && !config.text) delete config.text;
  chart.addCredits(config, true);
};

export default Credits;
