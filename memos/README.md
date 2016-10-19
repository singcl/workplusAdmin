##memos
leaning gulp yeoman and so on.
fixed the conflict. graceful!
this is created by feature1.
second fixed.
##关于bower安装的依赖自动载入失败的问题
  比如安装font-awesome后，启动服务后并不会自动加载font-awesome.css 
  1，请检查bower安装的包中是否有bower.josn文件
  2，bower.js文件键值main中是否包含.css文件的路径（最重要的一步！）

  比如font-awesome中就没有font-awesome.css的路径修改为：
  "main": [
    "css/font-awesome.css",
    "less/font-awesome.less",
    "scss/font-awesome.scss"
  ]
  重启serve，OK。
