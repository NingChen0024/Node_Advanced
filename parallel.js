var { promisify } = require('util')
var fs = require('fs')
var writeFile = promisify(fs.writeFile)
var unlink = promisify(fs.unlink)
var readdir = promisify(fs.readdir)

var delay = (seconds) => new Promise((resolve) => {
  setTimeout(() => resolve('waiting'), seconds*1000)
})

Promise.all([
  writeFile('readme.md', 'Hello World'),
  writeFile('readme.txt', 'Hello Word'),
  writeFile('readme.json', '{"hello: "world"}')
]).then(() => readdir(__dirname))
  .then(console.log)
  .then(() => delay(3))
  .then(() => Promise.all([
    unlink('readme.md'),
    unlink('readme.txt'),
    unlink('readme.json')
  ]))
  .then(() => readdir(__dirname))
  .then(console.log)
  .catch(error => console.log(error.message))

//   Promise.all([
//     writeFile('readme.md', 'Hello World'),
//     writeFile('readme.txt', 'Hello Word'),
//     writeFile('readme.json', '{"hello: "world"}')
//   ]).then(() => readdir(__dirname))
//     .then(console.log)
  

// Promise.all([
//     unlink('readme.md'),
//     unlink('readme.txt'),
//     unlink('readme.json')
//   ])
//   .then(() => readdir(__dirname))
//   .then(console.log)


  Promise.race([
    delay(5),
    delay(1),
    delay(3),
    delay(4)
  ]).then(() => readdir(__dirname))
    .then(console.log)