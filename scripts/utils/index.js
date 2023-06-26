const fs = require('fs')
const path = require('path')

function writePreprocessedData(content, filename) {
  fs.writeFileSync(
    path.resolve(__dirname, `../../src/assets/${filename}.json`),
    JSON.stringify(content, null, 2),
  )
}

module.exports = { writePreprocessedData }
