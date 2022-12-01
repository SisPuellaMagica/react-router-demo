import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'

export default function Main() {
    return (
        <div className={styles.root}>
            <Outlet />
        </div>
    )
}