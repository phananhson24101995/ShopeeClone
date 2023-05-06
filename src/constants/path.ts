interface PathType {
  home: string
  profile: string
  login: string
  register: string
  logout: string
  productDetail: string
}

const path: PathType = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':id'
} as const

export default path
