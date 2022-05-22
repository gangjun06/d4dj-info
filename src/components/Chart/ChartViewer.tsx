import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef } from 'react'
import { pad } from 'utils'
import { D4DJChartRenderer } from 'utils/chartRenderer'

export function ChartViewer({
  name,
  chartID,
}: {
  name: string
  chartID: number
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (ref.current) {
      axios
        .get(`https://cdn.d4dj.info/jp/ondemand/chart/chart_${pad(chartID, 8)}`)
        .then((res) => {
          //@ts-ignore
          new D4DJChartRenderer(ref.current).renderChart(res.data)
        })
    }
  }, [chartID])

  const download = () => {
    if (ref.current) {
      const link = document.createElement('a')
      link.href = ref.current.toDataURL('image/png')
      link.download = `${name}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>
      <div className="overflow-x-scroll" style={{ width: 'inherit' }}>
        <canvas ref={ref} height="750px"></canvas>
      </div>
      <div className="flex flex-wrap gap-y-3 mt-2 items-center justify-between">
        <button className="btn btn-accent" onClick={download}>
          {t('common:download')}
        </button>
        <a
          href="https://girlbands.party/d4dj/chart-previewer/"
          target="_blank"
          rel="noreferrer"
        >
          https://girlbands.party/d4dj/chart-previewer/
        </a>
      </div>
    </>
  )
}
