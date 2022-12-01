import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'

export default function Home() {
    const location = useLocation()

    const isDisplay = location.pathname === '/layout/home' || location.pathname.startsWith('/layout/home')

    const arr: number[] = []
    for (let i = 0; i < 100; i++) {
        arr[i] = i
    }

    return (
        <ul className={styles.root} style={{ display: isDisplay ? '' : 'none' }}>
            {arr.map(value => <li key={value}>{value}</li>)}
        </ul>
    )
}