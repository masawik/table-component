import React from 'react'
import cn from 'classnames'
import styles from './Pagination.module.css'

type TPaginationProps = {
  pagesCount: number,
  onChange: (newPage: number) => void,
  location: number
}

const MAX_COUNT_OF_DISPLAYED_PAGES = 15

const Pagination: React.FC<TPaginationProps> = ({onChange, pagesCount, location}) => {

  const changePageHandler = (page: number) => {
    onChange(page)
  }

  //todo переделать отображение страниц
  const $pages = Array(pagesCount).fill(null).map((_, index) => {
    const pageNumber = index + 1
    if (pagesCount >= MAX_COUNT_OF_DISPLAYED_PAGES) {
      if (location > pageNumber && pageNumber <= pagesCount - MAX_COUNT_OF_DISPLAYED_PAGES) return
      if (pageNumber >= MAX_COUNT_OF_DISPLAYED_PAGES + location) return
    }

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
      <button
        onClick={() => changePageHandler(location - 1)}
        disabled={location <= 1}
        className={styles.pageButton}
      >
        {'<'}
      </button>

      {
        pagesCount >= MAX_COUNT_OF_DISPLAYED_PAGES
        &&
        location > 1
        &&
        <div className={styles.pageButton} style={{border: 'none'}}>...</div>
      }

      {$pages}

      {
        pagesCount >= MAX_COUNT_OF_DISPLAYED_PAGES
        &&
        location <= pagesCount - MAX_COUNT_OF_DISPLAYED_PAGES
        &&
        <div className={styles.pageButton} style={{border: 'none'}}>...</div>
      }

      <button
        onClick={() => changePageHandler(location + 1)}
        disabled={location >= pagesCount}
        className={styles.pageButton}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination