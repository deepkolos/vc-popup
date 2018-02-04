const rm = require('rimraf')

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  console.log('clean done')
})