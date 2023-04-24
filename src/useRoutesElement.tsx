import { useRoutes } from 'react-router-dom'
import { ProductList } from './pages/ProductList'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { RegisterLayout } from './layouts/RegisterLayout'

export default function useRoutesElement() {
  const routeeElement = useRoutes([
    {
      path: '/products',
      element: <ProductList />
    },
    {
      path: '/',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeeElement
}
