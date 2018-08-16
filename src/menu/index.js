import menuadmin from './modules/menu-admin'

export const menuAside = [
  menuadmin
]
export const menuHeader = [{
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    title: '功能',
    icon: 'puzzle-piece',
    children: [
      menuadmin
    ]
  }

]