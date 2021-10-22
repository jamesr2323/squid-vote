const { webpackConfig, merge, rules } = require('@rails/webpacker')
const path = require('path')

const execSync = require('child_process').execSync;

const resolveConfig = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../../app/packs/bundles/'),
    ],
    fallback: {
      util: require.resolve("util/")
    }
  }
}

const cssConfig = {
  resolve: {
    extensions: ['.css', '.scss', '.svg']
  }
}

const provideConfig = require('./config/provideConfig')

function regexEqual(x, y) {
    return (x instanceof RegExp) && (y instanceof RegExp) &&
           (x.source === y.source) && (x.global === y.global) &&
           (x.ignoreCase === y.ignoreCase) && (x.multiline === y.multiline);
}

const cssIndex = rules.findIndex(rule => regexEqual(/\.(css)$/i, rule.test))
const scssIndex = rules.findIndex(rule => regexEqual(/\.(scss|sass)(\.erb)?$/i, rule.test))

rules[cssIndex].use.splice(2, 0, { loader: 'scoped-css-loader' })
rules[scssIndex].use.splice(2, 0, { loader: 'scoped-css-loader' })

rules[cssIndex].use[1].options.url = false
rules[scssIndex].use[1].options.url = false

const outputConfig = {
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}

const finalConfig = merge(webpackConfig, resolveConfig, provideConfig, cssConfig)

module.exports = finalConfig
