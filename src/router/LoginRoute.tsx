import { Navigate } from 'react-router-dom'
import { getToken } from '@/utils/localStorage'

export default function LoginRoute({ children }: { children: JSX.Element }) {
    if (getToken()) {
        return <Navigate replace to="/layout/home" />
    }
    return children
}