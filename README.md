## 工程目录说明
- mock/ 模拟接口json数据
- node_modules/ node第三方包
- src/ 源代码目录
    - blades/   公共底层库，包括了如业务相关的公共UI组件。<br>
                中文名【刀刃】博派机器卫兵,和机器卫兵兄弟们一起作战，并组合成守护神。<br>
                【刀刃】为企业应用提供澎湃动力,保驾护航。

    - hound/ 独立的业务模块在没有拆分之前都放到hound文件夹下，每个模块在划分自己的components,modals,routes,services。<br>
          中文名【探长】对地球充满好奇，塞伯坦上所没有的一切这是他渴望拥有的。雷达扫描，红外线信号接收，全息投影让对手无处可逃。<br>
          【探长】用高深的技术和超过人的计算能力来构建企业Saas应用。
		- authproxy 【授权代理人】
		- myteam/ 【我的团队】
		    * components
		    * modals
		    * routes
		    * services
- webpack-config/ 打包配置文件
- package.json npm管理文件
- mock.config.js 代理配置
- webpack.config.dev.js 开发环境配置
- webpack.config.js 生产环境配置
- README.md 项目说明文件


## 开发准备

### Nodejs相关
- 全局安装nodejs环境，下载请前往[nodejs.org](https://nodejs.org)

### Git相关
- 下载Git客户端，方便命令行操作，下载请前往[git-scm.com](https://git-scm.com/download/)


## 1. 下载项目并且启动

```
$ git clone git@git.yonyou.com:nccloud_hr/mwap.git
$ cd mwap
# 切换到develop分支进行开发
$ git checkout develop

# 安装依赖
$ npm install

# 启动开发
$ npm start
# 访问http://localhost:8080
```
