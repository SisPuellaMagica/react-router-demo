import { useState } from 'react'
import { Button, Form, Input, NavBar } from 'antd-mobile'
import { LockOutline, UserOutline } from 'antd-mobile-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { login } from '@/store/slices/user'
import useCutdown from '@/hooks/useCutdown'
import styles from './index.module.scss'

export default function Login() {
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [form] = Form.useForm()
    const [isLoading, setLoading] = useState(false)

    const { time, cutdown } = useCutdown()
    const onSendCode = async () => {
        await form.validateFields(['mobile'])
        cutdown(60)
    }

    const onLogin = async () => {
        const data = form.getFieldsValue() as { mobile: string, code: string }
        setLoading(true)
        try {
            await dispatch(login(data))
            setLoading(false)
            let pathname = '/layout/my'
            if (location.state) {
                const { from } = location.state as { from: string }
                pathname = from
            }
            navigate(pathname, { replace: true })
        } catch {
            setLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            <NavBar onBack={() => { navigate(-1) }}>登录</NavBar>
            <Form
                className="login-form"
                form={form}
                layout="horizontal"
                footer={<Button className='login-btn' block type='submit' color='primary' size='large' loading={isLoading}>登录</Button>}
                onFinish={onLogin}
            >
                <Form.Item
                    name="mobile"
                    label={<UserOutline />}
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: '手机号不能为空' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
                    ]}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item
                    name="code"
                    label={<LockOutline />}
                    extra={<Button size="small" color="primary" fill="outline" onClick={onSendCode} disabled={time > 0}>{time > 0 ? time + ' s' : '发送验证码'}</Button>}
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: '验证码不能为空' },
                        { pattern: /^\d{6}$/, message: '验证码格式错误' }
                    ]}
                >
                    <Input placeholder="请输入验证码" />
                </Form.Item>
            </Form>
        </div>
    )
}