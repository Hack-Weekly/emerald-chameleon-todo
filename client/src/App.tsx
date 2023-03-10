import { useState } from 'react'
import './App.scss'
import './components/Sidebar'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)
  const [selectedCats, setSelectedCats] = useState([])

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h1>Emerald Chameleons</h1>
      </div>
      <div className={'content'}>
        <Sidebar selectedCats={selectedCats} setSelectedCats={setSelectedCats} />
        <div className={'counter'}>
          <h2>To Do</h2>
        </div>
        <div className={'to-do-wrapper'}></div>
      </div>
    </div>
  )
}

export default App