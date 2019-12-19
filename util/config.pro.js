let fs = require('fs');

let exec = require('child_process').execSync;

const packDeploy = require('../src/packDeploy');

packDeploy.forEach(res => {
  if (res.isPack) {
    //写入变量
    fs.writeFileSync('./util/project.js', `exports.name = '${res.projectName}'`);
    exec('npm run build', {stdio: 'inherit'});
  }

});




