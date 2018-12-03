/* config-overrides.js */

const { injectBabelPlugin } = require('react-app-rewired');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireEslint = require('react-app-rewire-eslint');
const rewireLess = require("react-app-rewire-less-modules");


module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env)

  config = injectBabelPlugin(["@babel/proposal-decorators", {"legacy": true}], config)

  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config)

  config = rewireEslint(config, env);

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#00BFFF",
      "@input-height-base": "40px",
      "@btn-height-base": "40px",
    },
     javascriptEnabled: true,
   })(config, env);

  return config;

};
