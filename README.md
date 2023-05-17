# project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 环境依赖
vue2主体框架  
vuex全局数据管理  
vue router单页面应用路由管理  
axios向后端请求数据  

# 简单介绍
* 一个简单的无人机反制系统指控软件。
* 有简单的用户校验，拥有admin权限的用户可以增删改，其余用户只能查看。
* 使用sse和后端建立流用于实时接收后端推送的数据。
* 使用session会话来保存用户校验。
* 列表树、框架图和设备信息卡片都是响应式的。

## 1、assets存放静态资源  
图片  
## 2、components存放vue组件
* CommandFrame指挥框架图  
* EquipmentCard站点设备信息卡片  
* NavMenu导航菜单和用户登录  
* SwScroll带横向展开和收起的logo导航  
* TreeEnhance带右键功能的增强树形组件  
* TreeNode树节点从属于TreeEnhance  

## 3、config存放部分功能的全局配置文件  
* axios添加了跨域请求中携带身份凭据的axios  
* rem自适应rem的px值

## 4、pages存放完整的界面
* HistoryRecords计划提取历史记录 
* OverView概览界面（设备状态监控和站点设置）
* RealTimeSituation计划实时状态监控（地图标注） 
## 5、router存放路由设置
## 6、store存放vuex设置
* 数据存储形式和更改提交函数