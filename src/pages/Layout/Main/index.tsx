import { Route, Switch } from 'react-router-dom'
import { getRoutes } from '@/router/routes'
import { useAppSelector } from '@/store'
import styles from './index.module.scss'

export default function Main() {
    const menus = useAppSelector(state => state.user.menus)
    const routes = getRoutes(menus)

    return (
        <div className={styles.root}>
            <Switch>
                {routes.map(route => <Route key={route.key} path={route.path} component={route.component} />)}
            </Switch>
        </div>
    )
}