import useHighcharts from '../UseHighcharts';
import usePrevious from '../UsePrevious';
import { getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

const useManualEventHandlers = function(props, target) {
  const Highcharts = useHighcharts();
  const eventHandlers = getEventsConfig(props);
  const previousEventHandlers = usePrevious(eventHandlers);

  const modifiedEvenHandlers = getModifiedProps(
    previousEventHandlers,
    eventHandlers
  );

  if (modifiedEvenHandlers !== false) {
    Object.entries(modifiedEvenHandlers).forEach(([eventName, newHandler]) => {
      if (previousEventHandlers) {
        const oldHandler = previousEventHandlers[eventName];
        if (oldHandler) {
          Highcharts.removeEvent(target, eventName, oldHandler);
        }
      }

      Highcharts.addEvent(target, eventName, newHandler);
    });
  }
};

export default useManualEventHandlers;
