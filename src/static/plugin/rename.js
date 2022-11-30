const fs = require('fs')
const path = require('path')

const walkSync = (curDirPath, cb) => {
  fs.readdirSync(curDirPath, { withFileTypes: true }).forEach(
    (dirent, index) => {
      const filePath = path.join(curDirPath, dirent.name)
      if (dirent.isFile()) {
        cb(filePath, dirent, index)
      } else if (dirent.isDirectory()) {
        walkSync(filePath, cb)
      }
    }
  )
}

walkSync('文件夹', (filePath, stat, index) => {
  const newName = 'newName' + index
  fs.rename(filePath, newName, (err) => {
    console.log(err)
  })
})
