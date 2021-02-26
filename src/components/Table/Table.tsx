import React, {ChangeEvent, ReactNode, useCallback, useState} from 'react'
import styles from './Table.module.css'
import cn from 'classnames'
import Pagination from './Pagination/Pagination'

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

const ITEMS_PER_PAGE = 10

const Table: React.FC<TTableProps> = ({title, headerFields, values}) => {
  const [page, setPage] = useState(1)
  const [sortOptions, setSortOptions] = useState<TSortOptions>({field: null, isOrderDesc: false})
  const [localValues, setLocalValues] = useState<TTableValues[]>(values)
  const [searchValue, setSearchValue] = useState('')
  const headerKeys = Array.from(headerFields.keys())

  const getRow = useCallback((val: TTableValues): ReactNode => {
    const $cols = headerKeys.map(i => <td key={val[i]}>{val[i]}</td>)
    return (<tr key={val.id}>{$cols}</tr>)
  }, [])

  const getValuesToRender = useCallback(() => {
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = page * ITEMS_PER_PAGE
    return localValues.slice(from, to)
  }, [page, localValues])

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
  }, [sortOptions, localValues])

  const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value
    const searchRegex = new RegExp(searchQuery)
    setSearchValue(searchQuery)
    const newList = [...values.filter(i => {
      for (const value of Object.values(i)) {
        if (searchRegex.test(value+'')) return true
      }
    })]
    setLocalValues(newList)
    setPage(1)
  }, [])

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

  const $cols = getValuesToRender().map(i => getRow(i))
  return (
    <>
      <label>
        Поиск
        <input value={searchValue} onChange={searchHandler} className={styles.searchInput} type="text"/>
      </label>
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
      <Pagination
        location={page}
        pagesCount={Math.ceil(localValues.length / ITEMS_PER_PAGE)}
        onChange={(newPage) => setPage(newPage)}
      />
    </>
  )
}

export default Table