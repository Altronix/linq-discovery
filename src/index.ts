const bonjour = require('bonjour')()
import { EventEmitter } from 'events'

interface Txt {
  manufacturer: string
}

interface Service {
  addresses: string[]
  name: string
  port: number
  txt: Txt
}

class Device {
  product: string
  id: string
  ip: string
  port: number

  constructor(product: string, id: string, ip: string, port: number) {
    this.product = product
    this.id = id
    this.ip = ip
    this.port = port
  }
}

export declare interface Discovery {
  on(event: 'new', listener: (msg: object) => void): this
}

export class Discovery extends EventEmitter {
  constructor() {
    super()
  }

  discovery = () => {
    bonjour.find({ type: 'linq' }, (service: object) => {
      let svc: Service = <Service>service
      let device: Device = new Device(
        svc.name.split('-')[0], // product
        svc.name.split('-')[1], // id
        svc.addresses[0], // ipv4
        svc.port // port number
      )
      this.emit('new', device)
    })
  }

  async start(poll_period_ms: number) {
    this.discovery()
    setInterval(this.discovery, poll_period_ms) // Poll every 'poll_period_ms' milliseconds
  }
}



