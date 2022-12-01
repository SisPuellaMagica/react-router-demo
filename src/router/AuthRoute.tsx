import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/localStorage'

export default function AuthRoute({ children }: { children: JSX.Element }) {
    const location = useLocation()
    
    if (getToken()) {
        return children
    }
    return <Navigate replace to="/login" state={{ from: location.pathname }} />
}