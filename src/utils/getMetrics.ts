import _ from 'lodash'
import seedrandom from 'seedrandom'
import { I_hide_metrics } from './@types/_MetricsType'

const ticketProduct = 20

const goodAndBad = {
  cpa: {
    bad: ticketProduct * 1.6,
    good: ticketProduct * 0.4,
  },
  cpm: {
    bad: 30,
    good: 8,
  },
  ctr: {
    bad: 0.9,
    good: 3.5,
  },
  read: {
    bad: 0.6,
    good: 0.9,
  },
}

export function getHideMetricsRandom(idName: string): I_hide_metrics {
  seedrandom(idName, { global: true })
  return {
    CPA: _.random(goodAndBad.cpa.bad, goodAndBad.cpa.good),
    CPM: _.random(goodAndBad.cpm.bad, goodAndBad.cpm.good),
    CTR: _.random(goodAndBad.ctr.bad, goodAndBad.ctr.good),
    READ: _.random(goodAndBad.read.bad, goodAndBad.read.good),
  }
}

export function getMeanHideMetrics(metrics: I_hide_metrics[]): I_hide_metrics {
  return {
    CPA: _.meanBy(metrics, 'CPA'),
    CPM: _.meanBy(metrics, 'CPM'),
    CTR: _.meanBy(metrics, 'CTR'),
    READ: _.meanBy(metrics, 'READ'),
  }
}
