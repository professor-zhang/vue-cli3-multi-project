const merge = require('webpack-merge');
const packDeploy = require('./src/packDeploy');// 导入多项目配置文件
// 判断当前环境
const isExploit = process.env.NODE_ENV === 'development';

const vueConfig = merge(getProject(), {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.161.230:19001',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  }
});

// 页面配置生成
function pagesDeploy(res) {
  return {
    entry: `src/project/${res.projectName}/main.js`,
    template: `src/project/${res.projectName}/index.html`,
    filename: isExploit ? `${res.projectName}/index.html` : 'index.html',
    title: res.title,
    chunks: ['chunk-vendors', 'chunk-common', res.projectName],
  };
}

// 生成webpack的配置
function getProject() {
  const deploy = {
    pages: {},
    devServer: {
      historyApiFallback: {
        verbose: true,
        rewrites: []
      }
    }
  };
  if (isExploit) {

    const historyApiFallback = [];

    packDeploy.forEach(res => {
      if (res.isDev) {
        deploy.pages[res.projectName] = pagesDeploy(res);
        // 路由开启history模式时，重定向页面，动态的生成
        historyApiFallback.push({
          from: new RegExp(`^/${res.projectName}/.*$`),
          to: `/${res.projectName}/index.html`
        });
      }

    });

    deploy.devServer.historyApiFallback.rewrites = historyApiFallback;

  } else {

    const projectName = require('./config/project').name;

    const project = packDeploy.find(res => res.isPack && projectName === res.projectName);

    deploy.pages[project.projectName] = pagesDeploy(project);
    deploy.outputDir = `dist/${project.projectName}/`;
  }

  return deploy;

}

module.exports = vueConfig;
