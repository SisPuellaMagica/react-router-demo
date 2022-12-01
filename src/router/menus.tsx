import { Link } from 'react-router-dom'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

const staticMenus = [
    {
        key: 'home',
        label: <Link to="/layout/home">首页</Link>,
        icon: <AppstoreOutlined />
    }
]

const asyncMenus = [
    {
        key: 'setting',
        label: <Link to="/layout/setting">设置</Link>,
        icon: <SettingOutlined />
    }
]

export const getMenus = (menus: string[]) => [
    ...staticMenus,
    ...asyncMenus.filter(menu => menus.includes(menu.key))
]

export const getActiveKey = (pathname: string) => {
    if (pathname === '/layout/home' || pathname.startsWith('/layout/home/')) return 'home'
    if (pathname === '/layout/setting' || pathname.startsWith('/layout/setting/')) return 'setting'
    return ''
}