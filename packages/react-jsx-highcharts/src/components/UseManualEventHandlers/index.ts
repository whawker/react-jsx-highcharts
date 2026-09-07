import useHighcharts from '../UseHighcharts';
import usePrevious from '../UsePrevious';
import { getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

const useManualEventHandlers = function (
  props: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any
) {
  const Highcharts = useHighcharts();
  const eventHandlers = getEventsConfig(props);
  const previousEventHandlers = usePrevious(eventHandlers);

  const modifiedEvenHandlers = getModifiedProps(
    previousEventHandlers,
    eventHandlers
  );

  if (modifiedEvenHandlers !== false) {
    Object.keys(modifiedEvenHandlers).forEach(eventName => {
      if (previousEventHandlers) {
        const oldHandler = previousEventHandlers[eventName];
        if (oldHandler) {
          // @ts-expect-error TODO
          Highcharts.removeEvent(target, eventName, oldHandler);
        }
      }
      // @ts-expect-error TODO
      const newHandler = modifiedEvenHandlers[eventName];
      if (newHandler) {
        Highcharts.addEvent(target, eventName, newHandler);
      }
    });
  }
};

export default useManualEventHandlers;
