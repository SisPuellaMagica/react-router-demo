import { Avatar, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/store/slices/user'
import styles from './index.module.scss'

export default function Header() {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const userInfo = useAppSelector(state => state.user.userInfo)

    const onLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className={styles.root}>
            <h2 className="title">后台管理系统</h2>
            <Space className="user">
                <Avatar size={32} src={userInfo.avatar} />
                <span>{userInfo.name}</span>
                <Button shape="round" className="logout-btn" onClick={onLogout}>退出</Button>
            </Space>
        </div>
    )
}