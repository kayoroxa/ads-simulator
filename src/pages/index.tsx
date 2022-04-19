import { useEffect, useState } from 'react'
import AdsTemplate from '../template/AdsTemplate'
import { I_AllMetrics } from '../utils/@types/_MetricsType'
import createData from '../utils/generate'

export default function Home() {
  const [names, setNames] = useState({
    conjName: '[A-FDF] recife; gosta de futebol',
    nameAds: [
      '[A-FDF] sem botão; cta agressivo',
      '[A-FDF] botão rosa; cta passivo',
      '[A-FDF] botão rosa; sem cta',
    ],
  })

  const [data, setData] = useState<I_AllMetrics>(createData(names))

  useEffect(() => {
    console.log('Oi', names)
    setData(createData(names))
  }, [names])
  // const [show, setShow] = useState<'conj' | 'ads'>('conj')

  return (
    <AdsTemplate
      data={data}
      dataChange={(newTitle, indexAd) => {
        if (indexAd) {
          console.log(newTitle)
          setNames(prev => {
            const newNames = { ...prev }
            newNames.nameAds[indexAd] = newTitle
            return newNames
          })
        } else {
          setNames(prev => {
            prev.conjName = newTitle
            return prev
          })
        }
      }}
    />
  )
}
