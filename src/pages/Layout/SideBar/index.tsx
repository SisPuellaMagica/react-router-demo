import { Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import { getMenus, getActiveKey } from '@/router/menus'
import { useAppSelector } from '@/store'
import styles from './index.module.scss'

export default function SideBar() {
    const location = useLocation()
    
    const menus = useAppSelector(state => state.user.menus)
    
    const items = getMenus(menus)
    const activeKey = getActiveKey(location.pathname)

    return (
        <Menu
            className={styles.root}
            items={items}
            selectedKeys={[activeKey]}
        />
    )
}