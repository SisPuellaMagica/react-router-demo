import { useEffect, useRef, useState } from 'react'

export default function useCutdown() {
    const [time, setTime] = useState(0)
    const timeRef = useRef<number>(0)
    const timerRef = useRef<number>(-1) // 使用 ref 避免重复给定时器赋值

    useEffect(
        () => {
            return () => {
                window.clearInterval(timerRef.current)
            }
        },
        []
    )

    const cutdown = (initialValue: number) => {
        setTime(initialValue)
        timeRef.current = initialValue
        timerRef.current = window.setInterval(() => {
            // 定时器回调函数中直接使用 time 拿到的是首次 render 时的闭包值，应放入 ref 获取最新值
            if (timeRef.current <= 0) {
                window.clearInterval(timerRef.current)
                return
            }
            // setState 应当使用函数返回 state 值形式
            setTime((time: number) => time - 1)
            timeRef.current -= 1
        }, 1000)
    }

    return { time, cutdown }
}