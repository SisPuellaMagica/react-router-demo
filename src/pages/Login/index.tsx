import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/store'
import { login } from '@/store/slices/user'
import styles from './index.module.scss'

export default function Login() {
    const history = useHistory()
    const location = useLocation<{ from: string }>()

    const dispatch = useAppDispatch()

    const [isLoading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onLogin = async (data: { username: string, password: string }) => {
        try {
            setLoading(true)
            await dispatch(login(data))
            setLoading(false)
            let pathname = '/layout/home'
            if (location.state && location.state.from) {
                pathname = location.state.from
            }
            history.replace(pathname)
        } catch {
            setLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            <Form className="login-form" form={form} onFinish={onLogin}>
                <h2 className="title">后台管理系统</h2>
                <Form.Item
                    name="username"
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: '用户名不能为空' },
                        { pattern: /^[a-zA-Z0-9_-]{1,20}$/, message: '用户名格式错误' }
                    ]}
                >
                    <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: '密码不能为空' },
                        { pattern: /^[a-zA-Z0-9_-]{6,20}$/, message: '密码格式错误' }
                    ]}
                >
                    <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}