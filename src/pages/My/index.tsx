import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getUser } from '@/store/slices/user'
import { Avatar } from 'antd-mobile'
import styles from './index.module.scss'

export default function My() {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const userInfo = useAppSelector(state => state.user.userInfo)

    useEffect(
        () => {
            dispatch(getUser())
        },
        [dispatch]
    )

    return (
        <div className={styles.root}>
            <div className="user">
                <div className="base">
                    <Avatar className="avatar" src={userInfo.avatar} />
                    <h3 className="name">{userInfo.name}</h3>
                    <span className="edit" onClick={() => { navigate('/personal') }}>个人信息 &gt;</span>
                </div>
            </div>
        </div>
    )
}