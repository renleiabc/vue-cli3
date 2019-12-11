'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"//192.168.10.95:81"' // 开发环境接口地址(这里是增加的内容)  http://rap2api.taobao.org/app/mock/21549
})
