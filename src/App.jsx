import { useState } from 'react'
import './App.css'
import CryptoDash from './components/CryptoDash'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className ="App">
      <CryptoDash />
     </div>
    </>
   
  )
}



export default App
