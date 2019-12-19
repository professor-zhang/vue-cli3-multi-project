const packDeploy = require('../src/packDeploy');

function devPage() {
  const pages = {};
  const server = {
    historyApiFallback: {
      verbose: true,
      rewrites: []
    }
  };
  packDeploy.forEach(res => {
    if (res.isDev) {
      pages[res.projectName] = {
        entry: `src/project/${res.projectName}/main.js`,
        template: `src/project/${res.projectName}/index.html`,
        filename: `${res.projectName}/index.html`,
        title: res.title,
        chunks: ['chunk-vendors', 'chunk-common', res.projectName],
      };
      // 路由开启history模式时，重定向页面
      server.historyApiFallback.rewrites.push({
        from: new RegExp(`^/${res.projectName}/.*$`),
        to: `/${res.projectName}/index.html`
      })
    }

  })
  return {pages, server};
}


module.exports.inquire = devPage;


