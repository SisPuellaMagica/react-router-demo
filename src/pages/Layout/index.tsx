import { useEffect } from 'react'
import { useAppDispatch } from '@/store'
import { getUser } from '@/store/slices/user'
import Header from './Header'
import SideBar from './SideBar'
import Main from './Main'
import styles from './index.module.scss'

export default function Layout() {
    const dispatch = useAppDispatch()

    useEffect(
        () => {
            dispatch(getUser())
        },
        [dispatch]
    )

    return (
        <div className={styles.root}>
            <Header />
            <SideBar />
            <Main />
        </div>
    )
}