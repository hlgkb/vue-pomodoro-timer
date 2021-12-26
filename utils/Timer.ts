import { EventEmitter } from 'events'
import { calculateValue } from '@/utils/utils'

export class Timer {
  private eventEmitter = new EventEmitter()
  private running: boolean
  private paused: boolean
  private intervalId: any
  private totalCount: number
  private endCount: number

  constructor (endCount: number) {
    this.running = false
    this.paused = false
    this.totalCount = 0
    this.endCount = endCount
  }

  private dispatchEvent (eventType: string, data: any): void {
    this.eventEmitter.emit(eventType, data)
  }

  private timer () {
    this.totalCount--
    if (this.totalCount <= 0) {
      this.complete()
    }
    this.dispatchEvent('update', calculateValue(this.totalCount))
  }

  public start () {
    this.totalCount = (!this.paused) ? this.endCount * 60 : this.totalCount
    this.paused = false
    this.running = true
    this.intervalId = setInterval(() => {
      this.timer()
    }, 1000)
    this.dispatchEvent('started', true)
  }

  private complete () {
    this.stopTimer()
    this.dispatchEvent('completed', true)
  }

  private stopTimer () {
    clearInterval(this.intervalId)
    this.running = false
    this.paused = false
    this.intervalId = undefined
  }

  public isPause () {
    return this.paused
  }

  public isRunning () {
    return this.isRunning
  }

  public pause () {
    this.stopTimer()
    this.paused = true
    this.dispatchEvent('paused', true)
  }

  public stop () {
    this.stopTimer()
    this.dispatchEvent('stopped', true)
  }

  public setTarget (target: number) {
    this.totalCount = target * 60
    this.paused = true
  }

  public on (event: string, listener: (args: any) => void) {
    this.eventEmitter.on(event, listener)
  }

  public removeAllEvents () {
    ['started', 'completed', 'paused', 'stopped'].forEach((event) => {
      this.eventEmitter.removeAllListeners(event)
    })
  }
}
