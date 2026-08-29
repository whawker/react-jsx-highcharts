import { createContext } from 'react';

import type { Series } from 'highcharts';

export type SeriesContextValue = {
  object: Series;
  type: string;
  id: string;
  update: Series['update'];
  remove: Series['remove'];
  setData: Series['setData'];
  setVisible: Series['setVisible'];
};

const SeriesContext = createContext<SeriesContextValue | null>(null);
SeriesContext.displayName = 'SeriesContext';

export default SeriesContext;
