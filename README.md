# react-router-demo

## 简介

这是一个 React 路由案例，模拟 pc 端后台管理系统的动态路由。

环境如下：

- react + ts ( create-react-app )
- antd
- react-router-dom@6
- redux ( @reduxjs/toolkit )
- express + axios

## 运行

```sh
npm i
node server/server.js
npm start
```

账号1：

- 用户名：admin
- 密码：000000
- 拥有 home 和 setting 菜单

账号2：

- 用户名：admin
- 密码：000000
- 拥有 home 菜单

## token

token 需存放到 Redux 和本地，其中本地存储使用 localStorage 。

请参考 <code>src/store/slices/user.ts</code> 和  <code>src/utils/localStorage.ts</code> 。

## axios

需统一设置请求拦截器和响应拦截器。401 时退出重登。

请参考 <code>src/utils/request.ts</code> 。

## AuthRoute 与 LoginRoute

根据 token 决定渲染还是跳转，请参考 <code>src/router/AuthRoute.tsx</code> 和 <code>src/router/LoginRoute.tsx</code> 。

## 动态路由与动态菜单

Layout 组件中需要获取用户信息并存入 Redux 。请参考 <code>src/pages/Layout/index.tsx</code> 。

App 组件中生成动态路由。请参考 <code>src/App.tsx</code> 和 <code>src/router/AppRoutes.tsx</code> 。

SideBar 组件中生成动态菜单。请参考 <code>src/pages/Layout/SideBar/index.tsx</code> 和 <code>src/router/menus.tsx</code> 。
