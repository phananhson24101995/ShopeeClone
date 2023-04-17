import useRoutesElement from './useRoutesElement'

function App() {
  const routesElement = useRoutesElement()
  console.log('routesElement', routesElement)

  return <div>{routesElement}</div>
}

export default App
