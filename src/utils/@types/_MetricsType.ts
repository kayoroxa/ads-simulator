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

export interface I_hide_metrics {
  CPA: number
  CPM: number
  CTR: number
  READ: number
}

export interface I_visible_metrics {
  CPA: number
  CPM: number
  CTR: number
  READ: number

  CPC: number
  GASTADO: number
  VENDAS: number
  IMPRESSIONS: number
  BUDGET: number
}

export interface I_ad_metrics {
  idName: string
  hide: I_hide_metrics
  visible: I_visible_metrics
}

export interface _AllMetrics {
  conjData: I_Metrics
  ads: I_Metrics[]
}
