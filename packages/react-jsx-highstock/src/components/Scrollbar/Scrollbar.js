import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { attempt } from 'lodash-es'
import { useModifiedProps, useChart } from 'react-jsx-highcharts'

const Scrollbar = ({ children, enabled = true, ...restProps }) => {
  const chart = useChart()

  useEffect(() => {
    return () => {
      attempt(updateScrollbar, { enabled: false }, chart)
    }
  }, [])

  const modifiedProps = useModifiedProps({ enabled, ...restProps })

  useEffect(() => {
    if (modifiedProps !== false) {
      updateScrollbar(modifiedProps, chart)
    }
  })

  if (!children) return null

  return (
    <>{children}</>
  )
}

const updateScrollbar = (config, chart) => {
  chart.update({
    scrollbar: config
  }, true)
}

Scrollbar.propTypes = {
  enabled: PropTypes.bool
}

export default Scrollbar
