import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginRoute from '@/router/LoginRoute'
import AuthRoute from '@/router/AuthRoute'
import history from '@/router/history'
import styles from './App.module.scss'

const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

export default function App() {
    return (
        <div className={styles.root}>
            <Router history={history}>
                <React.Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                        <LoginRoute path="/login" component={Login} />
                        <AuthRoute path="/layout" component={Layout} />
                        <Route path="/*" component={NotFound} />
                    </Switch>
                </React.Suspense>
            </Router>
        </div>
    )
}