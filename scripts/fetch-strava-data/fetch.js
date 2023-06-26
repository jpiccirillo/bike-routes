/**
 * This is a hack to shoehorn node-fetch which is an ESM module, into this project
 * which per many vue / next boilerplates, is commonjs (CJS)
 * 
 * https://github.com/node-fetch/node-fetch/issues/1279
 */
module.exports.fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
