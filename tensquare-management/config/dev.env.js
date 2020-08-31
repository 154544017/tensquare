'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://192.168.135.128:7300/mock/5dd6c9eacc546d0b141fb290"',
  BASE_API: '"http://106.54.231.68:9011"',
})
