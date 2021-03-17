import { EventEmitter } from 'events'
import dgram from 'dgram'
const server = dgram.createSocket('udp4')
class Device {
  product: string
  id: string
  ip: string
  http: number
  https: number

  constructor(
    product: string,
    id: string,
    ip: string,
    http: number,
    https: number
  ) {
    this.product = product
    this.id = id
    this.ip = ip
    this.http = http
    this.https = https
  }
}

export declare interface Discovery {
  on(event: 'new', listener: (msg: object) => void): this
}
export class Discovery extends EventEmitter {
  devices: Map<string, object>
  constructor() {
    super()
    this.devices = new Map()
  }

  async start(port: number) {
    await server.bind(port)
    server.on('message', (msg: string) => {
      let obj = JSON.parse(msg.toString().split('\n')[0]);
      let device: Device = new Device(
        obj.product,
        obj.id,
        obj.ip,
        obj.http,
        obj.https
      )
      if (!this.devices.has(device.id)) {
        this.devices.set(device.id, device)
        this.emit('new', device)
      }
    })
  }

  get_devices() {
    let arr: object[] = []
    for (let value of this.devices.values()) {
      arr.push(value)
    }
    return arr
  }

  clear() {
    this.devices.clear()
  }
}

