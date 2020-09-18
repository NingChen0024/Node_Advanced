
function hideString(str, done) {

  // execute after one iteration
  process.nextTick(() => 
    done(str.replace(/[a-zA-Z]/g, 'x'))
  )
}

hideString("Hello Word", (hidden) => {
  console.log(hidden)
})

console.log('end')


// delay function
// callback hall
function delay(seconds, callback) {
  setTimeout(callback, seconds*1000)
}

console.log('starting delay')

delay(2, () => {
  console.log('two seconds')
  delay(1, () => {
    console.log('three seconds')
    delay(1, () => {
      console.log('four seconds')
    })
  })
})