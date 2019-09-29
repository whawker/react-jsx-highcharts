import { useContext } from 'react'
import ChartContext from '../ChartContext'

export default function useChart () {
  const ctxValue = useContext(ChartContext)

  return ctxValue
}
