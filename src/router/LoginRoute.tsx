import { Redirect, Route, RouteProps } from 'react-router-dom'
import { getToken } from '@/utils/localStorage'

interface Props extends RouteProps {
    component: React.ComponentType<any>
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
    return (
        <Route
            {...rest}
            render={() => {
                if (getToken()) {
                    return <Redirect to="/layout/my" />
                }
                return <Component />
            }}
        />
    )
}