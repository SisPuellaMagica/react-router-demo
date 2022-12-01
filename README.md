# react-router-demo

## 简介

这是一个 React 路由案例，模拟移动端路由。

环境如下：

- react + ts ( create-react-app )
- antd-mobile
- react-router-dom@6
- redux ( @reduxjs/toolkit )
- express + axios

## 运行

```sh
npm i
node server/server.js
npm start
```

账号：

- 手机号：13800000000
- 验证码：000000

## token

token 和 refresh_token 需存放到 Redux 和本地，其中本地存储使用 localStorage 。

请参考 <code>src/store/slices/user.ts</code> 和  <code>src/utils/localStorage.ts</code> 。

## axios

需统一设置请求拦截器和响应拦截器。401 时刷新 token 。

请参考 <code>src/utils/request.ts</code> 。

## useCutdown

获取验证码的倒计时功能。

利用 ref 解决函数式组件中定时器闭包与重复赋值问题。请参考 <code>src/hooks/useCutdown.ts</code> 。

## AuthRoute 与 LoginRoute

根据 token 决定渲染还是跳转。请参考 <code>src/router/AuthRoute.tsx</code> 和 <code>src/router/LoginRoute.tsx</code> 。

## keep-alive

React 不像 Vue 一样有 keep-alive ，官方认为有内存泄漏风险。但官方提出 2 种解决方案：

- 将页面需缓存的数据（如：滚动条位置等）存入 Redux 。
- 不销毁组件，而是通过 display 设置隐藏和显示。 

采用第一种方案。将滚动条位置记录到 Redux ，增加防抖效果。

- Home 组件请参考 <code>src/pages/Home/index.tsx</code> 。
- Redux 中的处理请参考 <code>src/store/slices/home.ts</code> 。
- 防抖请参考 <code>src/hooks/useDebounce.ts</code> 。
