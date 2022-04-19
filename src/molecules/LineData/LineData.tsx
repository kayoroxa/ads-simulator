import React from 'react'
import { ContainerLineData } from './styles-line-data'

interface IProps {
  data?: (string | number)[]
  title?: string
  onChangeTitle?: (newData: string) => void
}
const LineData = ({ title, data, onChangeTitle }: IProps) => {
  return (
    <ContainerLineData>
      {title && (
        <div className="value">
          <input value={title} onChange={e => onChangeTitle(e.target.value)} />
        </div>
      )}
      {data &&
        data.map((item: any, index: number) => {
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
