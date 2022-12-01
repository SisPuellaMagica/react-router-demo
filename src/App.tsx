import React from 'react'
import { unstable_HistoryRouter as Router } from 'react-router-dom'
import history from '@/router/history'
import AppRoutes from '@/router/AppRoutes'
import styles from './App.module.scss'

export default function App() {
    return (
        <div className={styles.root}>
            <Router history={history}>
                <React.Suspense fallback={<div>loading...</div>}>
                    <AppRoutes />
                </React.Suspense>
            </Router>
        </div>
    )
}