import React from 'react'
import { ContainerLineData } from './styles-line-data'

interface IProps {
  data: (string | number)[]
}
const LineData = ({ data }: IProps) => {
  return (
    <ContainerLineData>
      {data.map((item: any, index: number) => {
        return (
          <div key={index} className="value">
            <span>{item}</span>
          </div>
        )
      })}
    </ContainerLineData>
  )
}

export default LineData
