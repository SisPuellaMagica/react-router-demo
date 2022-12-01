import React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from '@/router/history'
import AuthRoute from '@/router/AuthRoute'
import LoginRoute from '@/router/LoginRoute'
import styles from './App.module.scss'

const Layout = React.lazy(() => import('@/pages/Layout'))
const Login = React.lazy(() => import('@/pages/Login'))
const Personal = React.lazy(() => import('@/pages/Personal'))

export default function App() {
    return (
        <div className={styles.root}>
            <Router history={history}>
                <React.Suspense fallback={<div>loading...</div>}>
                    <Route path="*" component={Layout} />
                    <Switch>
                        <Redirect exact from="/" to="/layout/home" />
                        <LoginRoute path="/login" component={Login} />
                        <AuthRoute path="/personal" component={Personal} />
                    </Switch>
                </React.Suspense>
            </Router>
        </div>
    )
}