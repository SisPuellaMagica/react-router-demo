import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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

export const getMenus = (menus: string[]) => {
    return [
        ...staticMenus,
        ...asyncMenus.filter(menu => menus.includes(menu.key))
    ]
}

export const getActiveKey = (pathname: string) => {
    if (pathname === '/layout/home' || pathname === '/layout/home/') return 'home'
    if (pathname === '/layout/setting' || pathname === '/layout/setting/') return 'setting'
    return ''
}