import { memo } from 'react'
import PropTypes from 'prop-types'
import useChartUpdate from '../UseChartUpdate'

const Legend = memo(({ children = null, enabled = true, ...restProps }) => {
  useChartUpdate(
    { enabled, ...restProps },
    updateLegend,
    chart =>
      updateLegend(chart, {
        enabled: false
      }),
    false
  )

  return children
})
const updateLegend = (chart, config) => {
  chart.update(
    {
      legend: config
    },
    false
  )
}

Legend.propTypes = {
  enabled: PropTypes.bool
}
Legend.displayName = 'Legend'

export default Legend
