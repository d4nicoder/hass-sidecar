const fs = jest.createMockFromModule('fs');

const files = [
  {
    folder: 'sample',
    file: 'automation1.ts'
  },
  {
    folder: 'sample',
    file: 'automation2.ts'
  },
  {
    folder: 'sample',
    file: 'automation3.ts'
  },
  {
    folder: 'sample',
    file: 'noAutomation.js'
  },
  {
    folder: 'sample/lib',
    file: 'library.ts'
  },
  {
    folder: 'sample',
    file: 'subfolder'
  },
  {
    folder: 'sample/subfolder',
    file: 'automation4.ts'
  },
]
fs.__files = files
fs.promises = {}
fs.promises.readdir = async (dir) => {
  return new Promise((resolve, reject) => {
    const files = fs.__files.filter(f => f.folder === dir).map(f => f.file)
    resolve(files)
  })
}
fs.promises.stat = async (file) => {
  return new Promise((resolve, reject) => {
    if (/\.[a-z0-9]{1,}$/i.test(file)) {
      resolve({
        isFile: () => true,
        isDirectory: () => false
      })
    } else {
      resolve({
        isFile: () => false,
        isDirectory: () => true
      })
    }
  })
}

module.exports = fs