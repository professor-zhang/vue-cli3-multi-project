// 引用fs模块
let fs = require('fs');
// 引入child_process并使用exec的同步方法
// 具体方法使用查看官方文档http://nodejs.cn/api/child_process.html
let exec = require('child_process').execSync;
// 引入打包的配置文件
const packDeploy = require('../src/packDeploy');
// 循坏项目查询要打包的项目
packDeploy.forEach(res => {
  if (res.isPack) {
    //利用fs模块向第三方存储打包项目的文件写入打包项目的名称
    fs.writeFileSync('./util/project.js', `exports.name = '${res.projectName}'`);
    //利用child_process的exec方法创建一个shell在其中执行官方的打包命令
    exec('npm run build', {stdio: 'inherit'});
  }

});




