const packDeploy = require('../src/packDeploy');
const name = require('./project').name;
const pages = {
  pages: {}
};

function proPack() {
  let a = packDeploy.find(res => name === res.projectName && res.isPack);
  pages.pages[a.projectName] = {
    entry: `src/project/${a.projectName}/main.js`,
    template: `src/project/${a.projectName}/index.html`,
    filename: `${a.projectName}/index.html`,
    title: a.title,
    chunks: ['chunk-vendors', 'chunk-common', a.projectName],
  };
  pages.outputDir = `dist/${a.projectName}/`
  return pages
}

module.exports.inquire = proPack();
