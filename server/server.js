const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/authorization', (req, res) => {
    const { mobile, code } = req.body
    if (mobile === '13800000000' && code === '000000') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                token: 'token',
                refresh_token: 'refresh_token'
            }
        })
    }
    else {
        res.statusCode = 404
        res.send({
            code: 404,
            message: '手机号或验证码错误',
            data: null
        })
    }
})

app.put('/authorization', (req, res) => {
    if (req.headers.authorization && req.headers.authorization === 'Bearer refresh_token') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                token: 'token'
            }
        })
    }
    else {
        res.statusCode = 401
        res.send({
            code: 401,
            message: 'token失效',
            data: null
        })
    }
})

app.get('/user', (req, res) => {
    if (req.headers.authorization && req.headers.authorization === 'Bearer token') {
        res.send({
            code: 200,
            message: 'success',
            data: {
                id: '1001',
                name: '蓝染惣右介',
                avatar: 'https://t10.baidu.com/it/u=3721591629,873541586&fm=58',
                intro: '你什么时候产生了我没使用镜花水月的错觉',
                sex: 1,
                birthday: '2000-1-1'
            }
        })
    }
    else {
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