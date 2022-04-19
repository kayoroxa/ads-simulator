import { useRef, useState } from 'react'
import myConjKit from '../utils/useAdsData'

export default function () {
  const kit1 = myConjKit('caio', ['rocha'])
  // createConj('conj', ['oi'])

  const allConjKit = [kit1, myConjKit('bruno', ['anuncio 1'])]

  const [conjSelect, setConjSelect] = useState<false | number>(false)

  const [inputValue, setInputValue] = useState('')
  const inputNameNewConj = useRef
  return (
    <div>
      {/* {JSON.stringify(conj, null, 2)} */}
      {/* {JSON.stringify(ads, null, 2)} */}
      {/* <input
        type="text"
        onChange={e => setInputValue(e.target.value)}
        onBlur={e => (e.target.value = '')}
      />
      <button
        onClick={() => {
          allConjKit.push(myConjKit('bruno', ['anuncio 1']))
        }}
      >
        add conj
      </button> */}
      {conjSelect === false && (
        <div>
          {allConjKit.map(({ conj, ads, addAd }, index) => (
            <div
              key={index}
              style={{ margin: '30px', border: '1px solid black' }}
            >
              <h1
                style={{ cursor: 'pointer' }}
                onClick={() => setConjSelect(index)}
              >
                {conj?.idName}
              </h1>
              <p>{JSON.stringify(conj?.mean)}</p>
              <br />
              <p>{JSON.stringify(conj?.metrics)}</p>
              <input
                type="text"
                onChange={e => setInputValue(e.target.value)}
                onBlur={e => (e.target.value = '')}
              />
              <button onClick={() => addAd(inputValue)}>add Ad</button>
            </div>
          ))}
        </div>
      )}

      {conjSelect !== false && (
        <div>
          <button onClick={() => setConjSelect(false)}>voltar</button>
          <input
            type="text"
            onChange={e => setInputValue(e.target.value)}
            onBlur={e => (e.target.value = '')}
          />
          <button onClick={() => allConjKit[conjSelect].addAd(inputValue)}>
            add ad
          </button>
          {allConjKit[conjSelect].ads.map((ad, index) => (
            <div
              key={index}
              style={{ margin: '30px', border: '1px solid black' }}
            >
              <h1>{ad?.idName}</h1>
              <p>{JSON.stringify(ad.mean)}</p>
              <br />
              <p>{JSON.stringify(ad.metrics)}</p>
            </div>
          ))}
        </div>
      )}

      {/* <button onClick={() => addAd('ads1', 0)}>add ads1</button> */}
    </div>
  )
}
