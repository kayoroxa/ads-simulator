import { useState } from 'react'
import LineData from '../../molecules/LineData'
import { I_AllMetrics } from '../../utils/@types/_MetricsType'
import { ContainerAdsTemplate } from './styles-ads-template'

interface IProps {
  data: I_AllMetrics
}
const AdsTemplate = ({ data }: IProps) => {
  const [show, setShow] = useState<'conj' | 'ads' | 'filter'>('conj')

  return (
    <ContainerAdsTemplate style={{ padding: '30px' }}>
      <div className="buttons">
        <button onClick={() => setShow('conj')}>Conj</button>
        <button onClick={() => setShow('ads')}>Ads</button>
        <button onClick={() => setShow('filter')}>Ads Filter</button>
      </div>
      <LineData data={['id Name', ...Object.keys(data.conjData.mean)]} />
      {show === 'conj' && (
        <>
          <LineData
            data={[data.conjData.idName, ...Object.values(data.conjData.mean)]}
          />
        </>
      )}
      <>
        {show === 'ads' &&
          data.ads.map((item, index: number) => {
            return (
              <div key={index}>
                <LineData data={[item.idName, ...Object.values(item.mean)]} />
              </div>
            )
          })}
        {show === 'filter' &&
          data.ads.map((item, index: number) => {
            return (
              <div key={index}>
                <LineData data={[item.idName, ...Object.values(item.mean)]} />
                <div className="filter">
                  {Object.keys(item.metrics).map((key, index) => {
                    return (
                      <LineData
                        key={index}
                        data={[key, JSON.stringify(item.metrics[key])]}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
      </>
    </ContainerAdsTemplate>
  )
}

export default AdsTemplate
