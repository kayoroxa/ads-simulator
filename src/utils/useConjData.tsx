import _ from 'lodash'
import { useEffect, useState } from 'react'
import { I_ad_metrics } from './@types/_MetricsType'
import { getHideMetricsRandom, getMeanHideMetrics } from './getMetrics'

export default function useConjData(
  idName: string,
  adsID: string[],
  BUDGET: number
) {
  const [ads, setAds] = useState<I_ad_metrics[]>([])

  const [conj, setConj] = useState<I_ad_metrics>({
    idName,
    hide: getHideMetricsRandom(idName),
    visible: null,
  })

  function generateAd(adID: string, BUDGET: number): I_ad_metrics {
    console.log('generateAd', BUDGET)
    const hide = getHideMetricsRandom(adID)
    const hideMeanVisible = getMeanHideMetrics([hide, conj.hide])

    return {
      idName: adID,
      hide,
      visible: {
        ...hideMeanVisible,
        CPC: 0,
        GASTADO: 0,
        VENDAS: 0,
        IMPRESSIONS: 0,
        BUDGET,
      },
    }
  }

  function addAd(adID: string) {
    setAds((prev: I_ad_metrics[]) => {
      debugger
      const prevFixed = _.cloneDeep(prev).map(ad => ({
        ...ad,
        visible: {
          ...ad.visible,
          BUDGET: conj.visible.BUDGET / prev.length + 1,
        },
      }))

      return [...prevFixed, generateAd(adID, BUDGET / (prev.length + 1))]
    })
  }

  function nextDay() {
    setAds((prev: I_ad_metrics[]) => {
      // const todayAd =
      const newAds = prev.map(yesterdayAd => {
        const newGastado = yesterdayAd.visible.GASTADO + BUDGET

        return {
          ...yesterdayAd,
          GASTADO: newGastado,
          IMPRESSIONS: (newGastado / yesterdayAd.visible.CPM) * 1000,
        }
      })
      return newAds
    })
  }

  function updateVisibleConj() {
    setConj(prev => ({
      ...prev,
      visible: {
        ...getMeanHideMetrics([...ads.map(ad => ad.hide)]),
        CPC: _.meanBy(ads, 'CPC'),
        GASTADO: _.sumBy(ads, 'GASTADO'),
        VENDAS: _.sumBy(ads, 'VENDAS'),
        IMPRESSIONS: _.sumBy(ads, 'IMPRESSIONS'),
        BUDGET,
      },
    }))
  }
  useEffect(() => {
    addAd(adsID[0])
  }, [])

  useEffect(() => {
    updateVisibleConj()
  }, [ads])

  return {
    addAd,
    ads,
    conj,
    money: 20,
    addMoney: (money: number) => {},
  }
}
