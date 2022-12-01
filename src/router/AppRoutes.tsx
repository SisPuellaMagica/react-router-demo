import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useAppSelector } from '@/store'
import AuthRoute from './AuthRoute'
import LoginRoute from './LoginRoute'

const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const Home = React.lazy(() => import('@/pages/Home'))
const Setting = React.lazy(() => import('@/pages/Setting'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

export default function AppRoutes() {
    const menus = useAppSelector(state => state.user.menus)

    const asyncRoutes = [
        {
            key: 'setting',
            path: 'setting',
            element: <Setting />
        }
    ]

    const routes = [
        {
            path: '/',
            element: <Navigate replace to="/login" />
        },
        {
            path: '/login',
            element: <LoginRoute><Login /></LoginRoute>
        },
        {
            path: '/layout/*',
            element: <AuthRoute><Layout /></AuthRoute>,
            children: [
                {
                    path: 'home',
                    element: <Home />
                },
                ...asyncRoutes.filter(route => menus.includes(route.key))
            ]
        },
        {
            path: '/*',
            element: <NotFound />
        }
    ]

    return useRoutes(routes)
}