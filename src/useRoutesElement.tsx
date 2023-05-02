import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { ProductList } from './pages/ProductList'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { RegisterLayout } from './layouts/RegisterLayout'
import { MainLayout } from './layouts/MainLayout'
import { Profile } from './pages/Profile'
import { AppContext } from './contexts/app.context'
import { useContext } from 'react'
import path from './constants/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log('ProtectedRoute', isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log('RejectedRoute', isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRoutesElement() {
  const routeeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },

    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeeElement
}
