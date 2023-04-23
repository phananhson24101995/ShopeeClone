import useRoutesElement from './useRoutesElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routesElement = useRoutesElement()
  console.log('routesElement', routesElement)

  return (
    <div>
      {routesElement}
      <ToastContainer />
    </div>
  )
}

export default App
