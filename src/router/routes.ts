import React from 'react'

const Home = React.lazy(() => import('@/pages/Home'))
const Setting = React.lazy(() => import('@/pages/Setting'))

const staticRoutes = [
    {
        key: 'home',
        path: '/layout/home',
        component: Home
    }
]

const asyncRoutes = [
    {
        key: 'setting',
        path: '/layout/setting',
        component: Setting
    }
]

export const getRoutes = (menus: string[]) => [
    ...staticRoutes,
    ...asyncRoutes.filter(route => menus.includes(route.key))
]