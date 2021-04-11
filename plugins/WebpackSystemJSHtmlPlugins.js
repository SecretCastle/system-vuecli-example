const { validate } = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    include: {
      type: "object"
    }
  },
  additionalProperties: false
};
class WebpackSystemJSHtmlPlugin {
  constructor(options) {
    validate(schema, options);
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("html-webpack-plugin-alter-asset-tags", (data) => {
        if (this.options.include) {
          // 增加include
          const InjectHtmlTag = {
            tagName: "script",
            voidTag: false,
            meta: { plugin: "html-webpack-plugin" },
            attributes: { type: "systemjs-importmap" },
            innerHTML: JSON.stringify({ imports: this.options.include })
          };
          data.head.push(InjectHtmlTag);
        }
        data.body = data.body.map((script) => {
          if (script.attributes) {
            script.attributes = Object.assign(script.attributes, {
              type: "systemjs-module"
            });
          }
          return script;
        });
      });
    });
  }
}

module.exports = WebpackSystemJSHtmlPlugin;
