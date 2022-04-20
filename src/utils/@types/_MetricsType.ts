export interface I_Metrics {
  idName: string
  metrics: {
    [k: string]: {
      [k: string]: number
    }
  }
  mean: {
    [k: string]: number
  }
}

export interface I_Metrics_Ad {
  idName: string
  conjID: string
  metrics: {
    [k: string]: {
      [k: string]: number
    }
  }
  mean: {
    [k: string]: number
  }
}

export interface I_AllMetrics {
  conjData: I_Metrics
  ads: I_Metrics[]
}
