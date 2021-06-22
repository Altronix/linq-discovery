import { EventEmitter } from 'events'
import dgram from 'dgram'

const UDP_BCAST_PORT = 7123 /* Default PORT */
const server = dgram.createSocket('udp4')

type PLATFORM = 'k64' | 'm5' | 'same53'

interface Device {
  version: number
  manufacturer: string
  family: PLATFORM
  product: string
  id: string
  ip: string
  http?: number
  https?: number
  mqtt?: number
  mqtts?: number
  zmtp?: number
  zmtps?: number
}

export declare interface Discovery {
  on(event: 'new', listener: (msg: Device) => void): this
  on(event: 'message', listener: (msg: Device) => void): this
}

export class Discovery extends EventEmitter {
  devices: Map<string, Device>
  constructor(port: number = UDP_BCAST_PORT) {
    super()
    this.devices = new Map()
    this.start(port)
  }

  async start(port: number) {
    await server.bind(port)
    server.on('message', (msg: object) => {
      let obj: Device = JSON.parse(msg.toString())
      if (obj.manufacturer.toUpperCase() === 'ALTRONIX') {
        if (!this.devices.has(obj.id)) {
          this.devices.set(obj.id, obj)
          this.emit('new', obj)
        }
        this.emit('message', obj)
      }
    })
  }

  get_devices() {
    let arr: Device[] = []
    for (let value of this.devices.values()) {
      arr.push(value)
    }
    return arr
  }

  clear() {
    this.devices.clear()
  }
}
