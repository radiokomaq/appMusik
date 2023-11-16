import  { FC } from 'react'
import MainPage from './pages/mainPage'
import PlayBar from './Components/PlayBar/PlayBar'

const App: FC = () => {
  return (
    <div className='w-full h-full flex flex-col '>
      <MainPage />
      <PlayBar />
    </div>
  )
}

export default App
