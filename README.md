# 基于Vue3最新标准，实现后台前端综合解决方案

## 项目简介

前言：前一阵子的学习主要集中在React，由易到难做了四个项目，对前端开发也有了更深入的了解。前端领域的三个框架React、Vue、Angular，目前我只对React还算了解。最近学习了Vue3，再接触了React之后再来看Vue，两者有许多相似之处。Vue很多地方也借鉴了React和Angular，Vue3中用script setup来写JS代码和React很像，所以我选择用Vue3做一个后台管理系统，也作为学习Vue的一个实践。结合前几个项目的类型，这次的项目类型我选择了后台管理系统，那么五个项目就涉及了普通Web页面开发、移动端单页面app开发、组件库开发、node.js开发、后台管理系统开发，基本上把热门的前端开发类型过了一遍，后面还可以学习Electron桌面端开发、微信小程序开发、混合多端开发。

简介：本项目是基于VUE3，参考vue-element-admin开发的后台前端综合解决方案。

## 技术栈

前端部分:Vue3、element-plus、vueRouter4 、vuex4

后端部分:expess（采用慕课网提供的后端接口）

## 项目结构

![admin架构图](https://user-images.githubusercontent.com/65885530/178899472-28a03e78-b5fe-40b2-972c-9812b9c1f4dd.png)


## 项目地址




## 功能实现

### 1.登录页面
![图片](https://user-images.githubusercontent.com/65885530/178902868-94e4921d-2e08-47d6-bacd-7ecacbcf47a8.png)


### 2.主页面
![图片](https://user-images.githubusercontent.com/65885530/178902690-7c687555-6d5b-49f5-8e09-4ed208eb6c81.png)
![图片](https://user-images.githubusercontent.com/65885530/178902767-ccd3c885-5a70-4bec-971b-531b7eec656c.png)


### 3.后台通用方案
菜单栏：导航、页面检索、全屏、换肤、国际化、菜单

![图片](https://user-images.githubusercontent.com/65885530/178900993-9e947bee-620f-4835-85a5-bfff85dc8bec.png)


#### 国际化
![图片](https://user-images.githubusercontent.com/65885530/178903299-50d00598-7060-4036-bbe3-d63dea99fe2e.png)


#### 动态主题
![图片](https://user-images.githubusercontent.com/65885530/178903387-2e61fe87-d958-4cb1-96bb-e4b72c025a32.png)


#### 全屏处理
![图片](https://user-images.githubusercontent.com/65885530/178903425-b66807c8-8f58-4b0c-b09a-f4952dee1e28.png)


#### 页面检索
![图片](https://user-images.githubusercontent.com/65885530/178903466-96896e0e-8805-49d4-a122-b0247f29988b.png)


#### TagsViews
![图片](https://user-images.githubusercontent.com/65885530/178903780-aff2338a-5eab-442e-82a4-893ef53c51f5.png)


#### 功能引导
![图片](https://user-images.githubusercontent.com/65885530/178903837-e6127536-09ee-4545-9409-f16a950039d6.png)


### 4.数据注入、导出
![图片](https://user-images.githubusercontent.com/65885530/178901404-71b6aafc-f2d0-4832-8e14-63d79b064d89.png)
![图片](https://user-images.githubusercontent.com/65885530/178901433-4a0fe7fd-6d13-4ecd-9504-8680ad358437.png)
![图片](https://user-images.githubusercontent.com/65885530/178901502-032cee32-02bf-4c1b-a98d-c8144c2d2687.png)


### 5.权限分控
![图片](https://user-images.githubusercontent.com/65885530/178903910-ee1c0698-a37b-48af-898d-98963a3d3956.png)


### 6.表格处理
![图片](https://user-images.githubusercontent.com/65885530/178904029-5ddfe019-dedd-47fc-bd33-0e42dcf1ee18.png)
 
 
### 7.文章编辑器
#### markdown
![图片](https://user-images.githubusercontent.com/65885530/178901742-c8405bc8-5ed0-4215-94d2-afbe0a5af583.png)

#### 富文本
![图片](https://user-images.githubusercontent.com/65885530/178901768-da68de30-aebc-417f-8fe0-bd58376bc742.png)


### **8. 待实现功能：**

1. 图表
2. 数据可视化
3. 待定......

## 项目运行

1.将项目clone下来

```shell
$ git clone https://github.com/luozhiqiang-code/vue-admin.git
$ cd admin
$ npm install
```

2.运行

首先到admin/.env.development修改后端接口地址

```javascript
# just a flag
ENV = 'production'

# base api
VUE_APP_BASE_API = 'https://imooc-admin.lgdsunday.club/prod-api'
```

然后到admin/src/utils/request.js修改icode验证码

```javascript
 config.headers.icode = 'B9292E99276D75B4'
```
