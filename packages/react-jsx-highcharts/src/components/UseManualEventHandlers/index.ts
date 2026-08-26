import useHighcharts from '../UseHighcharts';
import usePrevious from '../UsePrevious';
import { getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

const useManualEventHandlers = function (props, target) {
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
          Highcharts.removeEvent(target, eventName, oldHandler);
        }
      }
      const newHandler = modifiedEvenHandlers[eventName];
      if (newHandler) {
        Highcharts.addEvent(target, eventName, newHandler);
      }
    });
  }
};

export default useManualEventHandlers;
