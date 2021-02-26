import React from 'react'
import cn from 'classnames'
import styles from './Pagination.module.css'

type TPaginationProps = {
  pagesCount: number,
  onChange: (newPage: number) => void,
  location: number
}

const MAX_COUNT_OF_DISPLAYED_PAGES = 11
const Pagination: React.FC<TPaginationProps> = ({onChange, pagesCount, location}) => {

  const changePageHandler = (page: number) => {
    onChange(page)
  }

  const pagesIndent = Math.floor(MAX_COUNT_OF_DISPLAYED_PAGES / 2)
  const $pages = Array(pagesCount).fill(null).map((_, index) => {
    const pageNumber = index + 1
    if (pageNumber < location - pagesIndent && location < pagesCount - pagesIndent) return
    if (pageNumber > location + pagesIndent && location > pagesIndent) return
    if (location < pagesIndent + 1 && pageNumber > MAX_COUNT_OF_DISPLAYED_PAGES) return
    if (location > pagesCount - pagesIndent - 1 && pageNumber <= pagesCount - MAX_COUNT_OF_DISPLAYED_PAGES) return

    return (
      <button
        onClick={() => changePageHandler(pageNumber)}
        className={cn(styles.pageButton, {[styles.active]: pageNumber === location})}
        key={`page-${pageNumber}`}
      >
        {pageNumber}
      </button>
    )
  })

  return (
    <div className={styles.box}>
      <span className={styles.fastTravelLeftBox}>
        <button
          onClick={() => changePageHandler(1)}
          className={styles.pageButton}
          disabled={location === 1}
        >
          {'<<'}
        </button>
        <button
          onClick={() => changePageHandler(location - 1)}
          className={styles.pageButton}
          disabled={location === 1}
        >
          {'<'}
        </button>
      </span>

      {$pages}

      <span className={styles.fastTravelRightBox}>
        <button
          onClick={() => changePageHandler(location + 1)}
          className={styles.pageButton}
          disabled={location === pagesCount}
        >
          {'>'}
        </button>
        <button
          onClick={() => changePageHandler(pagesCount)}
          className={styles.pageButton}
          disabled={location === pagesCount}
        >
          {'>>'}
        </button>
      </span>
    </div>
  )
}

export default Pagination