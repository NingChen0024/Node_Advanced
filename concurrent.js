
var logUpdate = require('log-update')
var toX = () => 'X'
var delay = (seconds) => new Promise((resolve) => {
  setTimeout(resolve, seconds*1000)
})

var task = [
  delay(5),
  delay(6),
  delay(2),
  delay(3),
  delay(4),
  delay(9)
]

class PromiseQueue {

  constructor(promises = [], concurrentCount = 1) {
    this.concurrent = concurrentCount
    this.total = promises.length
    this.todo = promises
    this.running = []
    this.complete = []
  }

  get runAnother() {
    return (this.running.length < this.concurrent) && this.todo.length
  }

  graphTasks() {
    var { todo, running, complete} = this
    logUpdate(`
      todo: [${todo.map(toX)}]
      running: [${running.map(toX)}]
      complete: [${complete.map(toX)}]
    `)
  }

  run() {
    while (this.runAnother) {
      var promise = this.todo.shift()
      promise.then(() => {
        this.complete.push(this.running.shift())
        this.graphTasks()
        this.run()
      })
      this.running.push(promise)
      this.graphTasks()
    }
  }
}

var delayQueue = new PromiseQueue(task, 1)
delayQueue.run()