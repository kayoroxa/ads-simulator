import { useEffect, useState } from 'react'
import { I_Metrics } from './@types/_MetricsType'
import { getAllMetrics, meanJoin } from './generate'

interface I_myConjKit {
  addAd: (name: string) => void
  conj: I_Metrics
  ads: I_Metrics[]
}

export default function myConjKit(
  name: string,
  ads?: string[],
  moneyStart: number = 20
) {
  const [money, setMoney] = useState<number>(moneyStart)
  const [inside_conj, setInside_conj] = useState<I_Metrics>()
  const [inside_ads, setInside_Ads] = useState<I_Metrics[]>([])

  const [visible_conj, setVisible_Conj] = useState<I_Metrics>()
  const [visibleAds, setVisible_Ads] = useState<I_Metrics[]>([])

  useEffect(() => {
    if (!inside_ads || !inside_conj) return
    const newAds = inside_ads.map((ad, id) =>
      meanJoin([ad, inside_conj], ad.idName)
    )
    const newConj = meanJoin(newAds, inside_conj.idName)

    setVisible_Ads(newAds)
    setVisible_Conj(newConj)
  }, [inside_conj, inside_ads])

  useEffect(() => {
    if (ads) {
      setInside_Ads(() =>
        inside_ads.map(({ idName }) => getAllMetrics(idName, money))
      )
    }
  }, [money])

  useEffect(() => {
    setInside_conj(getAllMetrics(name))
    if (ads) {
      setInside_Ads(prev => ads.map(name => getAllMetrics(name, money)))
    }
  }, [])

  return {
    addAd: (name: string) => {
      setInside_Ads(prev => [...prev, getAllMetrics(name, money)])
    },
    conj: visible_conj,
    ads: visibleAds,
    addMoney: (money: number) => {
      setMoney(prev => prev + money)
    },
    money,
  }
}

// function useAdsData() {
//   let allConjKit = []

//   allConjKit.push(myConjKit('caio', ['rocha']))

//   return {
//     addAd: (adName: string, kitID) => {
//       allConjKit[kitID].addAd(adName)
//     },
//     getConj: (kitID: number) => {
//       return allConjKit[kitID].conj
//     },
//     createConj: (name: string, ads?: string[]) => {
//       allConjKit.push(myConjKit(name, ads))
//     },
//     allConjKit,
//   }
// }
