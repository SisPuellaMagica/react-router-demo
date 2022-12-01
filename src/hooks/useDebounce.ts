import { useRef } from 'react'
import { debounce } from 'lodash'

export default function useDebounce(fn: (...args: any) => any, delay: number) {
    // 使用 ref 避免重复生成防抖函数
    const debounceRef = useRef(debounce(fn, delay))

    return debounceRef.current
}