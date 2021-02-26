import React from 'react'
import Table, {TTableHeaderFields} from './components/Table/Table'
import data from './users.json'

type TValues = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}
type THeaderKeys = keyof TValues

function App() {
  const header: TTableHeaderFields = new Map<THeaderKeys, string | number>([
    ['id', 'id'],
    ['name', 'Имя'],
    ['username', 'Никнейм'],
    ['email', 'Почта'],
    ['phone', 'Номер телефона'],
    ['website', 'веб-сайт'],
  ])

  const values: TValues[] = data

  return (
    <div>
      <Table
        title='Список пользователей'
        headerFields={header}
        values={values}
      />
    </div>
  )
}

export default App
