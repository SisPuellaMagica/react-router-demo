import React from 'react'
import { TabBar } from 'antd-mobile'
import { AppOutline, MessageOutline, SearchOutline, UserOutline } from 'antd-mobile-icons'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import AuthRoute from '@/router/AuthRoute'
import styles from './index.module.scss'

const Home = React.lazy(() => import('@/pages/Home'))
const Find = React.lazy(() => import('@/pages/Find'))
const Message = React.lazy(() => import('@/pages/Message'))
const My = React.lazy(() => import('@/pages/My'))

export default function Layout() {
    const location = useLocation()

    const isDisplay = location.pathname === '/layout' || location.pathname.startsWith('/layout/')

    const tabs = [
        {
            key: 'home',
            title: <Link to="/layout/home">首页</Link>,
            icon: <AppOutline />
        },
        {
            key: 'find',
            title: <Link to="/layout/find">发现</Link>,
            icon: <SearchOutline />
        },
        {
            key: 'message',
            title: <Link to="/layout/message">消息</Link>,
            icon: <MessageOutline />
        },
        {
            key: 'my',
            title: <Link to="/layout/my">我的</Link>,
            icon: <UserOutline />
        }
    ]

    const getActiveKey = (pathname: string) => {
        if (pathname === '/layout/home' || pathname.startsWith('/layout/home/')) return 'home'
        if (pathname === '/layout/find' || pathname.startsWith('/layout/find/')) return 'find'
        if (pathname === '/layout/message' || pathname.startsWith('/layout/message/')) return 'message'
        if (pathname === '/layout/my' || pathname.startsWith('/layout/my/')) return 'my'
        return ''
    }

    return (
        <div className={styles.root} style={{ display: isDisplay ? '' : 'none' }}>
            <div className="main">
                <Route path="*" component={Home} />
                <Switch>
                    <Route path="/layout/find" component={Find} />
                    <AuthRoute path="/layout/message" component={Message} />
                    <AuthRoute path="/layout/my" component={My} />
                </Switch>
            </div>
            <TabBar className="bottom" activeKey={getActiveKey(location.pathname)}>
                {tabs.map(item => <TabBar.Item key={item.key} icon={item.icon} title={item.title} />)}
            </TabBar>
        </div>
    )
}