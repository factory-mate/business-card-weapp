export const queryBuilder = <T extends object>(queryData: QueryDataItem<T>[] = []) => {
  let qs = ''
  const qsList: string[] = []
  queryData.forEach((i) => {
    switch (i.type) {
      case 'eq':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} = ${i.val}`)
        }
        break
      case 'like':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} like ${i.val}`)
        }
        break
      case 'in':
        if (i.key && i.val && i.val.length > 0) {
          qsList.push(`${i.key} in (${i.val.join(',')})`)
        }
        break
      case 'gt':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} > ${i.val}`)
        }
        break
      case 'lt':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} < ${i.val}`)
        }
        break
      case 'gte':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} >= ${i.val}`)
        }
        break
      case 'lte':
        if (i.key && (i.val || i.val === 0)) {
          qsList.push(`${i.key} <= ${i.val}`)
        }
        break
      case 'raw':
        if (i.val) {
          qsList.push(i.val)
        }
        break
      // case 'date':
      //   if (i.key && i.val) {
      //     qsList.push(`${i.key} >= ${DateUtils.formatTime(i.val, 'YYYY-MM-DD')}T00:00:00`)
      //     qsList.push(`${i.key} <= ${DateUtils.formatTime(i.val, 'YYYY-MM-DD')}T23:59:59`)
      //   }
      //   break
      // case 'date-range':
      //   if (i.key && i.val) {
      //     qsList.push(`${i.key} >= ${DateUtils.formatTime(i.val[0], 'YYYY-MM-DD')}T00:00:00`)
      //     qsList.push(`${i.key} <= ${DateUtils.formatTime(i.val[1], 'YYYY-MM-DD')}T23:59:59`)
      //   }
      //   break
      default:
        break
    }
  })
  if (qsList.length > 0) {
    qs = qsList.join(' && ')
  }
  return qs
}

type StringKeys<T> = {
  [K in keyof T]: K extends string ? K : never
}[keyof T]

interface QueryDataItem<T extends object> {
  type: QueryDataType
  key: StringKeys<T>
  val: any
}

type QueryDataType =
  | 'eq'
  | 'like'
  | 'in'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'raw'
  | 'date'
  | 'date-range'
