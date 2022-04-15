import { useState } from 'react'
import AdsTemplate from '../template/AdsTemplate'
import { I_AllMetrics } from '../utils/@types/_MetricsType'
import createData from '../utils/generate'

export default function Home() {
  const [data, setData] = useState<I_AllMetrics>(
    createData({
      conjName: '[A-FDF] recife; gosta de futebol',
      nameAds: [
        '[A-FDF] sem botão; cta agressivo',
        '[A-FDF] botão rosa; cta passivo',
        '[A-FDF] botão rosa; sem cta',
      ],
    })
  )
  // const [show, setShow] = useState<'conj' | 'ads'>('conj')

  return <AdsTemplate data={data} />
}
