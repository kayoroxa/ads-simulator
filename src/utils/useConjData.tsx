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
    active: true,
    hide: getHideMetricsRandom(idName),
    visible: null,
  })

  function generateAd(adID: string, BUDGET: number): I_ad_metrics {
    console.log('generateAd', BUDGET)
    const hide = getHideMetricsRandom(adID)
    // const hideMeanVisible = getMeanHideMetrics([hide, conj.hide])

    return {
      idName: adID,
      hide,
      active: true,
      visible: {
        // ...hideMeanVisible,
        CPA: 0,
        CPM: _.meanBy([hide, conj.hide], 'CPM'),
        CTR: 0,
        READ: 0,

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
      const newBudget = BUDGET / (prev.filter(v => v.active).length + 1)

      debugger
      const prevFixed = _.cloneDeep(prev).map(ad => ({
        ...ad,
        visible: {
          ...ad.visible,
          BUDGET: newBudget,
        },
      }))

      return [...prevFixed, generateAd(adID, newBudget)]
    })
  }

  function updateAdsBudget() {
    setAds(prev => {
      const newBudget = BUDGET / (prev.filter(v => v.active).length + 1)

      return prev.map(ad => ({
        ...ad,
        visible: {
          ...ad.visible,
          BUDGET: ad.active ? newBudget : 0,
        },
      }))
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

  function togglePauseAd(adID: string) {
    setAds((prev: I_ad_metrics[]) => {
      const newAds = prev.map(ad => {
        if (ad.idName === adID) {
          return {
            ...ad,
            active: !ad.active,
          }
        }
        return ad
      })

      const newAdsFixedBudget = newAds.map(ad => {
        const newBudget = BUDGET / newAds.filter(v => v.active).length
        return {
          ...ad,
          visible: {
            ...ad.visible,
            BUDGET: ad.active ? newBudget : 0,
          },
        }
      })

      return newAdsFixedBudget
    })
  }

  function updateVisibleConj() {
    setConj(prev => ({
      ...prev,
      visible: {
        ...getMeanHideMetrics([...ads.map(ad => ad.hide)]),
        CPC: _.meanBy(
          ads.map(v => v.visible),
          'CPC'
        ),
        GASTADO: _.sumBy(
          ads.map(v => v.visible),
          'GASTADO'
        ),
        VENDAS: _.sumBy(
          ads.map(v => v.visible),
          'VENDAS'
        ),
        IMPRESSIONS: _.sumBy(
          ads.map(v => v.visible),
          'IMPRESSIONS'
        ),
        BUDGET,
      },
    }))
  }
  useEffect(() => {
    addAd(adsID[0])
  }, [])

  useEffect(() => {
    // updateAdsBudget()
    updateVisibleConj()
  }, [ads])

  return {
    addAd,
    pauseAd: togglePauseAd,
    ads,
    conj,
    money: 20,
    addMoney: (money: number) => {},
  }
}
