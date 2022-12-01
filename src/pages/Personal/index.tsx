import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getUser, logout } from '@/store/slices/user'
import { Avatar, Button, List, NavBar } from 'antd-mobile'
import styles from './index.module.scss'

export default function Personal() {
    const history = useHistory()

    const dispatch = useAppDispatch()
    const userInfo = useAppSelector(state => state.user.userInfo)

    useEffect(
        () => {
            dispatch(getUser())
        },
        [dispatch]
    )

    const onLogout = () => {
        dispatch(logout())
        history.push('/layout/home')
    }

    return (
        <div className={styles.root}>
            <NavBar onBack={() => { history.goBack() }}>个人信息</NavBar>
            <List>
                <List.Item extra={<Avatar className="avatar" src={userInfo.avatar} />}>头像</List.Item>
                <List.Item extra={userInfo.name}>昵称</List.Item>
                <List.Item extra={userInfo.intro}>简介</List.Item>
                <List.Item extra={userInfo.sex === 1 ? '男' : '女'}>性别</List.Item>
                <List.Item extra={userInfo.birthday}>生日</List.Item>
            </List>
            <Button className="logout-btn" block color="primary" size="large" onClick={onLogout}>退出</Button>
        </div>
    )
}