import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import AuthRoute from '@/router/AuthRoute'
import LoginRoute from '@/router/LoginRoute'

const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const Home = React.lazy(() => import('@/pages/Home'))
const Find = React.lazy(() => import('@/pages/Find'))
const Message = React.lazy(() => import('@/pages/Message'))
const My = React.lazy(() => import('@/pages/My'))
const Personal = React.lazy(() => import('@/pages/Personal'))

export default function AppRoutes() {
    const routes = [
        {
            path: '/',
            element: <Navigate replace to="/layout/home" />
        },
        {
            path: '/login',
            element: <LoginRoute><Login /></LoginRoute>
        },
        {
            path: '/layout/*',
            element: <Layout />,
            children: [
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'find',
                    element: <Find />
                },
                {
                    path: 'message',
                    element: <AuthRoute><Message /></AuthRoute>
                },
                {
                    path: 'my',
                    element: <AuthRoute><My /></AuthRoute>
                }
            ]
        },
        {
            path: '/personal',
            element: <AuthRoute><Personal /></AuthRoute>
        }
    ]
    return useRoutes(routes)
}