import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import myConjKit from '../utils/useAdsData'

export default function () {
  const kit1 = myConjKit('pernambuco - int: loja', ['chamada agressiva'], 20)
  // createConj('conj', ['oi'])

  let allConjKit = []

  // const [allConjKit, setAllConjKit] = useState([
  //   kit1,
  //   myConjKit('são paulo - int: loja', ['chamada passiva'], 20),
  // ])

  const [startConjData, setStartConjData] = useState([
    {
      conj: 'desterro',
      ad: 'chamada agressiva',
    },
    {
      conj: 'igarassu',
      ad: 'chamada passifica',
    },
  ])

  function createMoreConj(name: string, ads?: string[]) {
    allConjKit = [myConjKit(name, ads, 20)]
    console.log(allConjKit)
  }

  const [conjSelect, setConjSelect] = useState<false | number>(false)

  const [inputValue, setInputValue] = useState('')

  // on key down
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Insert') {
        allConjKit[0].addMoney(20)
        allConjKit[1].addMoney(20)
      }
    })
  }, [])

  function validate(values) {
    const erros: any = {}
    if (!values.name || values.name.length === 0) {
      return (erros.name = 'Campo obrigatório')
    }
    return erros
  }

  return (
    <div>
      {conjSelect === false && (
        <div>
          <Formik
            onSubmit={values => {
              console.log('Olá')
              setStartConjData(prev => [
                ...prev,
                { conj: values.conjName, ad: values.adName },
              ])
              // allConjKit.push()
              // debugger
              // console.log(myConjKit(values.conjName, [values.adName], 20))
            }}
            validate={values => {
              const errors: any = {}
              if (!values.conjName || !values.adName) {
                errors.name = 'Campo obrigatório'
              }
              return errors
            }}
            initialValues={{
              conjName: '',
              adName: '',
            }}
            render={() => (
              <Form>
                <label>Conj Name</label>
                <Field
                  name="conjName"
                  type="text"
                  placeholder="Nome do conjunto"
                />
                <label>Ad Name</label>
                <Field name="adName" type="text" placeholder="Nome do ads" />
                <button type="submit">Create new Conj</button>
              </Form>
            )}
          />
        </div>
      )}

      {conjSelect !== false && (
        <div>
          <button onClick={() => setConjSelect(false)}>voltar</button>
          {/* <Formik
            validate={validate}
            onSubmit={values => {
              allConjKit[conjSelect].addAd(values.name)
            }}
            initialValues={{ name: '' }}
            render={() => (
              <Form>
                <label>name</label>
                <Field name="name" type="text" />
                <button type="submit">add Ad</button>
              </Form>
            )}
          /> */}
        </div>
      )}

      {/* <button onClick={() => addAd('ads1', 0)}>add ads1</button> */}

      {startConjData.map(({ conj, ad }, index) => (
        <ConjElement
          key={index}
          startConjName={conj}
          startAdName={ad}
          conjSelect={conjSelect}
          setConjSelect={setConjSelect}
          validate={validate}
          index={index}
        />
      ))}
    </div>
  )
}

function ConjElement({
  startConjName,
  startAdName,
  setConjSelect,
  validate,
  index,
  conjSelect,
}) {
  const { conj, ads, addAd, money } = myConjKit(
    startConjName,
    [startAdName],
    20
  )
  if (conjSelect === index) {
    return (
      <>
        <Formik
          validate={validate}
          onSubmit={values => {
            addAd(values.name)
          }}
          initialValues={{ name: '' }}
          render={() => (
            <Form>
              <label>name</label>
              <Field name="name" type="text" />
              <button type="submit">add Ad</button>
            </Form>
          )}
        />
        {ads.map((ad, index) => (
          <div
            key={index}
            style={{ margin: '30px', border: '1px solid black' }}
          >
            <h1>{ad?.idName}</h1>
            <p>{money}</p>
            <br />
            <p>{JSON.stringify(ad.mean)}</p>
            <br />
            <p>{JSON.stringify(ad.metrics)}</p>
          </div>
        ))}
      </>
    )
  } else if (conjSelect === false) {
    return (
      <div key={index} style={{ margin: '30px', border: '1px solid black' }}>
        <h1 style={{ cursor: 'pointer' }} onClick={() => setConjSelect(index)}>
          {conj?.idName}
        </h1>
        <p>{money}</p>
        <br />
        <p>{JSON.stringify(conj?.mean)}</p>
        <br />
        <p>{JSON.stringify(conj?.metrics)}</p>
        <Formik
          validate={validate}
          onSubmit={values => {
            addAd(values.name)
          }}
          initialValues={{ name: '' }}
          render={() => (
            <Form>
              <label>name</label>
              <Field name="name" type="text" />
              <button type="submit">add Ad</button>
            </Form>
          )}
        />
      </div>
    )
  } else {
    return <></>
  }
}
