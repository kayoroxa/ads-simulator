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

  function addAd(adID: string) {
    setAds((prev: I_ad_metrics[]) => {
      const hide = getHideMetricsRandom(adID)
      return [
        ...prev,
        {
          idName: adID,
          hide,
          visible: {
            ...getMeanHideMetrics([hide, conj.hide]),
            CPC: 0,
            GASTADO: 0,
            VENDAS: 0,
            IMPRESSIONS: 0,
            BUDGET: 0,
          },
        },
      ]
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
  }
}
