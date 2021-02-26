import React, {ReactNode, useCallback, useState} from 'react'
import styles from './Table.module.css'
import cn from 'classnames'

export type TTableHeaderFields = Map<string, string | number>
type TTableValues = {
  id: string | number,
  [key: string]: string | number
}

type TTableProps = {
  title?: string,
  headerFields: TTableHeaderFields,
  values: TTableValues[],
}

type TSortOptions = {
  field: keyof TTableValues | null,
  isOrderDesc: boolean
}

const Table: React.FC<TTableProps> = ({title, headerFields, values}) => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({field: null, isOrderDesc: false})
  const [localValues, setLocalValues] = useState<TTableValues[]>(values)
  const headerKeys = Array.from(headerFields.keys())
  const getRow = useCallback((val: TTableValues): ReactNode => {
    const $cols = headerKeys.map(i => <td key={val[i]}>{val[i]}</td>)
    return (<tr key={val.id}>{$cols}</tr>)
  }, [])

  const onSort = useCallback((field: string) => {
    let isOrderDesc = sortOptions.isOrderDesc
    if (sortOptions.field === field) {
      isOrderDesc = !isOrderDesc
      setSortOptions(prevState => ({...prevState, isOrderDesc}))
    } else {
      isOrderDesc = false
      setSortOptions({field, isOrderDesc})
    }
    const sorted = [...localValues.sort((prev, next) => {
      return prev[field] < next[field] ? -1 : 1
    })]
    if (isOrderDesc) sorted.reverse()
    setLocalValues(sorted)
  }, [sortOptions])

  const $header: ReactNode = Array.from(headerFields)
    .map(([k, v]) => {
      const isSortField = sortOptions.field === k
      return (<td
        onClick={() => onSort(k)}
        className={cn(styles.headerCell,
          {
            [styles.sorting]: isSortField,
            [styles.desc]: isSortField && sortOptions.isOrderDesc
          })}
        key={v}>
        {v}
      </td>)
    }
    )

  const $cols = localValues.map(i => getRow(i))
  return (
    <>
      <input type="text"/>
      <table className={styles.table}>
        {title && <caption className={styles.title}>{title}</caption>}
        <thead>
          <tr>
            {$header}
          </tr>
        </thead>
        <tbody>
          {$cols}
        </tbody>
      </table>
    </>
  )
}

export default Table