const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/authorization', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === '000000') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                token: 'admin'
            }
        })
    } else if (username === 'zhangsan' && password === '000000') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                token: 'zhangsan'
            }
        })
    } else {
        res.statusCode = 404
        res.send({
            code: 404,
            message: '用户名或密码错误',
            data: null
        })
    }
})

app.get('/user', (req, res) => {
    if (req.headers.authorization && req.headers.authorization === 'Bearer admin') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                userInfo: {
                    id: '1001',
                    name: '超级管理员',
                    avatar: 'https://t10.baidu.com/it/u=3721591629,873541586&fm=58'
                },
                menus: ['setting']
            }
        })
    } else if (req.headers.authorization && req.headers.authorization === 'Bearer zhangsan') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                userInfo: {
                    id: '1001',
                    name: '张三',
                    avatar: 'https://t10.baidu.com/it/u=3507209880,533978212&fm=58'
                },
                menus: []
            }
        })
    } else {
        res.statusCode = 401
        res.send({
            code: 401,
            message: 'token失效',
            data: null
        })
    }
})

app.listen(8080, () => {
    console.log('server is running at http://localhost:8080')
})