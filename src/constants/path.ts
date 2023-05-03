interface PathType {
  home: string,
  profile: string,
  login: string,
  register: string,
  logout: string
}

const path: PathType = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  logout: '/logout'
} as const

export default path