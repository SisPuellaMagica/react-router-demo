import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/localStorage'

interface Props extends RouteProps {
    component: React.ComponentType<any>
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
    const location = useLocation()

    return (
        <Route
            {...rest}
            render={
                () => {
                    if (getToken()) {
                        return <Component />
                    }
                    return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
                }
            }
        />
    )
}