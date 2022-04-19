import seedrandom from 'seedrandom'
import getOscilatron from './ocilação-de-tempo'

function round2(num) {
  return parseFloat(num.toFixed(2))
}

function calRange(min, max, percent) {
  return round2((max - min) * percent + min)
}

const ticketProduct = 19.9

const goodAndBad = {
  ctr: {
    bad: 0.5,
    good: 2.5,
  },
  cpm: {
    bad: 30,
    good: 8,
  },
  cpa: {
    bad: ticketProduct * 1.6,
    good: ticketProduct * 0.4,
  },
  read: {
    bad: 0.6,
    good: 0.9,
  },
}

const funil = ['ctr', 'cpm', 'cpa', 'read']

const filters = [
  'desktop',
  'android',
  'ios',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
  'feed-facebook',
  'feed-instagram',
  'reels',
  'stories',
]

function getScore(money = 0) {
  let myFunil = funil.map(f => {
    return [f, calRange(goodAndBad[f].bad, goodAndBad[f].good, Math.random())]
  })

  const myFunilWithOscilatron = myFunil.map(range => {
    if (range[0] === 'cpm') return range
    const cpm = myFunil.find(f => f[0] === 'cpm')[1]
    const impressões = (money / cpm) * 1000
    const rangeWithOscilatron = getOscilatron(impressões, range[1], {
      minOscilatron: 0.1,
      maxOscilatron: 2.5,
      viewsStabilization: 22000,
    }).generate()

    window.getOscilatron = getOscilatron
    debugger
    return [range[0], Math.max(rangeWithOscilatron, 0)]
  })

  const result = Object.fromEntries(myFunilWithOscilatron)

  const views = (1000 / (result.cpm / money)) * (result.ctr / 100) // * result.read

  if (money < result.cpa) result['cpa'] = 0

  const vendas = Math.round(views / result.cpa)
  result['vendas'] = result.cpa > 0 ? vendas : 0

  result['impressões'] = (money / result.cpm) * 1000
  return result
}

export function getAllMetrics(idName, money = 20) {
  seedrandom(idName, { global: true })

  const metrics = Object.fromEntries(filters.map(f => [f, getScore(money)]))
  metrics['vendas'] = metrics
  // console.log(metrics2)
  // console.log(metrics)

  const allToMean = Object.fromEntries(
    funil.map(f => [f, Object.values(metrics).map(item => item[f])])
  )

  return {
    idName,
    metrics,
    mean: Object.fromEntries(
      funil.map(f => [
        f,
        round2(allToMean[f].reduce((a, b) => a + b, 0) / allToMean[f].length),
      ])
    ),
  }
}

function mean(data) {
  return Object.fromEntries(
    Object.keys(data[0]).map(f => [
      f,
      round2(data.reduce((a, b) => a + b[f], 0) / data.length),
    ])
  )
}

export function meanJoin(ads, idName) {
  const metrics = Object.fromEntries(
    filters.map(f => [f, mean([...ads.map(ad => ad.metrics[f])])])
  )

  const allToMean = Object.fromEntries(
    funil.map(f => [f, Object.values(metrics).map(item => item[f])])
  )

  return {
    idName,
    metrics,
    mean: Object.fromEntries(
      funil.map(f => [
        f,
        round2(allToMean[f].reduce((a, b) => a + b, 0) / allToMean[f].length),
      ])
    ),
  }
}

function createData({ conjName, nameAds }) {
  const P1 = getAllMetrics(conjName, 60)

  const ads = nameAds.map(name => getAllMetrics(name, 20))

  const newAds = ads.map((ad, id) => meanJoin([ad, P1], `Anuncio ${id}`))
  const newConj = meanJoin(newAds, 'Conjunto')

  newAds.forEach(ad => {
    console.log(ad)
  })

  return {
    conjData: newConj,
    ads: newAds,
  }
}

export default createData
