var { promisify } = require('util')
var fs = require('fs')
var writeFile = promisify(fs.writeFile)
var unlink = promisify(fs.unlink)
var beep = () => process.stdout.write("\x07")

var delay = (seconds) => new Promise((resolve) => {
  setTimeout(() => resolve('waiting'), seconds*1000)
})


// executing with promise
const doStuffSequentially = () => Promise.resolve()
  .then(() => console.log('starting'))
  .then(() => delay(1))
  .then(() => 'waiting')
  .then(console.log)
  .then(() => delay(2))
  .then(() => writeFile('file.txt', 'Sample File...'))
  .then(beep)
  .then(() => 'file.txt created')
  .then(console.log)
  .then(() => delay(3))
  .then(() => unlink('file.txt'))
  .then(beep)
  .then(() => 'file.txt removed')
  .then(console.log)
  .catch(console.error)


// executing with async
const doStuffSequentiallyTwo = async () => {
  console.log('starting')
  var prompt = await delay(1)
  console.log(prompt)
  await delay(2)
  try {
    await writeFile('file.txt', 'Sample file...')
  beep()
  } catch{
    console.error(error)
  }
  console.log('file.txt created')
  await delay(3)
  await unlink('file.txt')
  beep()
  console.log('file.txt removed')

  return "finished"
}

async function start() {
  var result = await doStuffSequentiallyTwo()

  let newPromise = () => new Promise (resolve => {
      // setTimeout(() => resolve("all"), 1000)
      resolve(' All')
    }) 
  
  var resultTwo = await newPromise()

  console.log(result + resultTwo)
}

start()
