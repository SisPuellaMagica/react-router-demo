import { TabBar } from 'antd-mobile'
import { AppOutline, MessageOutline, SearchOutline, UserOutline } from 'antd-mobile-icons'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styles from './index.module.scss'

export default function Layout() {
    const location = useLocation()

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
        if (pathname === '/layout/home' || pathname === '/layout/home/') return 'home'
        if (pathname === '/layout/find' || pathname === '/layout/find/') return 'find'
        if (pathname === '/layout/message' || pathname === '/layout/message/') return 'message'
        if (pathname === '/layout/my' || pathname === '/layout/my/') return 'my'
        return ''
    }

    return (
        <div className={styles.root}>
            <div className="main">
                <Outlet />
            </div>
            <TabBar className="bottom" activeKey={getActiveKey(location.pathname)}>
                {tabs.map(item => <TabBar.Item key={item.key} icon={item.icon} title={item.title} />)}
            </TabBar>
        </div>
    )
}