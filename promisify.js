var { promisify } = require('util')
var fs = require('fs')

// a normal callback function
var delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} seconds its to long`))
  } else {
    setTimeout(() => 
      callback(null, `the ${seconds} second delay is over`),
      seconds * 1000
    )
  }
}

// normal use of call back
delay(4, (error, message) => {
  if (error) {
    console.log(error.message)
  } else {
    console.log(message)
  }
})


// promisified usage of call back
var promiseDelay = promisify(delay)

promiseDelay(4)
  .then(console.log)
  .catch(error => console.log(`${error.message} is too long`))


// promisify file system
var writeFile = promisify(fs.writeFile)

writeFile('sample.txt', 'this is a sample')
  .then(() => console.log('file successfully created'))
  .catch((error) => console.log(`error creating file: ${error.message}`))



// practise
var meth = (number, callback) => {
  if(number > 0){
    callback(null, 'big number')
  }
}

var newMeth = promisify(meth)

newMeth(4)
  .then(message => console.log(message))
  .then(() => 'new message')
  .then(newMessage => `this is ${newMessage}`)
  .then(console.log)
  .catch(error => console.log(error.message))
 
