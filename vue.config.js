module.exports = {
  css: {
    extract: false
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  chainWebpack: (config) => {
    config.output
      .filename("js/[name].js")
      .library("vueApp")
      .libraryTarget("system")
      .end();
    config.plugin("html").tap((args) => {
      args[0].inject = false;
      return args;
    });
    config.optimization.delete("splitChunks");
    config.externals(["vue"]);
  },
  configureWebpack: {
    module: {
      rules: [{ parser: { system: false } }]
    }
  }
};
