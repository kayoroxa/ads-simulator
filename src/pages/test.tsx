import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import myConjKit from '../utils/useAdsData'

export default function () {
  const kit1 = myConjKit('pernambuco - int: loja', ['chamada agressiva'], 20)
  // createConj('conj', ['oi'])

  const allConjKit = [
    kit1,
    myConjKit('são paulo - int: loja', ['chamada passiva'], 20),
  ]

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
              console.log(values)
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
              <p>{allConjKit[0].money}</p>
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
          ))}
        </div>
      )}

      {conjSelect !== false && (
        <div>
          <button onClick={() => setConjSelect(false)}>voltar</button>
          <Formik
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
          />

          {allConjKit[conjSelect].ads.map((ad, index) => (
            <div
              key={index}
              style={{ margin: '30px', border: '1px solid black' }}
            >
              <h1>{ad?.idName}</h1>
              <p>{allConjKit[0].money}</p>
              <br />
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
