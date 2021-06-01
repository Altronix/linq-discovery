import { EventEmitter } from 'events'
import dgram from 'dgram'

const UDP_BCAST_PORT = 7123
const server = dgram.createSocket('udp4')

export declare interface Discovery {
  on(event: 'new', listener: (msg: object) => void): this
  on(event: 'message', listener: (msg: object) => void): this
}

export class Discovery extends EventEmitter {
  devices: Map<string, object>
  constructor(port: number = UDP_BCAST_PORT) {
    super()
    this.devices = new Map()
    this.start(port)
  }

  async start(port: number) {
    await server.bind(port)
    server.on('message', (msg: string) => {
      let obj = JSON.parse(msg.toString().split('\n')[0])
      if (!this.devices.has(obj.id)) {
        this.devices.set(obj.id, obj)
        this.emit('new', obj)
      }
      this.emit('message', obj)
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
