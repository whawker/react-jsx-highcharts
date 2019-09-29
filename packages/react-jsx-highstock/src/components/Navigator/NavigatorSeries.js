import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { attempt } from 'lodash-es'
import { useSeries } from 'react-jsx-highcharts'

const NavigatorSeries = props => {
  const series = useSeries(props.seriesId)

  useEffect(() => {
    if (!series) return

    updateNavigatorSeries(series, { showInNavigator: true })
    return () => {
      attempt(updateNavigatorSeries, series, { showInNavigator: false })
    }
  }, [series])

  return null
}

const updateNavigatorSeries = (series, config) => {
  series.update(config)
}

NavigatorSeries.propTypes = {
  seriesId: PropTypes.string
}
export default NavigatorSeries
