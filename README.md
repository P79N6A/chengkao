## vue 大型应用脚手架

### 安装方法
> 首先，确定 tnpm 使用的是 3.x 版本
如果不是, 执行 `sudo npm install -g tnpm@3 --registry=http://registry.npm.alibaba-inc.com`

```
tnpm install

npm run dev   ## 开发模式

npm run build ## 生成构建后的文件
```

### 编码规范
* 代码全部使用两个空格缩进, 以免引起大量 diff 和冲突
* 不建议写可有可无的分号
* 不建议写可有可无的花括号 {}
* 使用 let 和 const 替代 var,在离代码最近的地方声明变量,不要都声明在函数头部
* 文件名中不要出现大写字母,使用中划线 - 分隔单词
* 局部样式名以-开头,避免全局冲突,尽量使用兄长（~），亲子（>），相邻（+）选择器代替子孙选择器（空格）,减少作用范围

```
.toad-item > .-title { ... }
```

* import 时应明确要引入的函数, 避免使用 import *
* vue components 变量使用大写开头, html 里使用中划线 <a-b> 自定义标签
