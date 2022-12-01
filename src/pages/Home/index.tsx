import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { saveScrollTop } from '@/store/slices/home'
import useDebounce from '@/hooks/useDebounce'
import styles from './index.module.scss'

export default function Home() {
    const dispatch = useAppDispatch()
    const scrollTop = useAppSelector(state => state.home.scrollTop)

    const ref = useRef<HTMLUListElement>(null)

    const onScroll = useDebounce((scrollTop: number) => {
        dispatch(saveScrollTop(scrollTop))
    }, 500)

    useEffect(
        () => {
            if (ref.current) {
                ref.current.scrollTop = scrollTop
            }
        },
        [scrollTop]
    )

    useEffect(
        () => {
            if (ref.current) {
                const el = ref.current
                el.addEventListener('scroll', () => { onScroll(el.scrollTop) })
                return () => {
                    el.removeEventListener('scroll', onScroll)
                }
            }
        },
        [dispatch, onScroll]
    )

    const arr: number[] = []
    for (let i = 0; i < 100; i++) {
        arr[i] = i
    }

    return (
        <ul className={styles.root} ref={ref}>
            {arr.map(value => <li key={value}>{value}</li>)}
        </ul>
    )
}