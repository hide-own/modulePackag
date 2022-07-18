import { GetPrevMonthDaysType } from './index'

export const getYearMonthDay = (value: Date) => {
  const date = value ? new Date(value) : new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return [year, month, day]
}
export const getCurrentMonthLastDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

export const getPrevMonthLastDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

export const cloneDate = (date: Date) => {
  return new Date(date.getTime())
}

export const toMatrix = (list: GetPrevMonthDaysType[], elementPerSubArray: number) => {
  // 通过一个索引
  const matrix: GetPrevMonthDaysType[][] = []
  let k = -1
  list.forEach((item, i) => {
    if (i % elementPerSubArray === 0) {
      k++
      matrix[k] = []
    }
    matrix[k].push(item)
  })
  return matrix
}
