var delay = (seconds) => new Promise((resolves, rejects) => {

  // throw an error
  // throw new Error('new error')

  if (seconds > 3) {

    rejects(new Error(`${seconds} is too long`))
    
  } else {

    setTimeout(() => {
      resolves([1, 2, 3])
    }, seconds*1000)

  }
})

delay(2)
  .then((message) => console.log(message[0]))
  .then(() => 42)
  .then(number => console.log(`hello world: ${number}`))
  .catch((error) => console.log(`error: ${error.message}`))

console.log('end first tick')