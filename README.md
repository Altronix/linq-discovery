# linq-discovery

npm library to discover linq devices using UDP broadcast

<h3>Install</h3>
<pre>yarn add linq-discovery</pre> 
or
<pre>npm i linq-discovery</pre>

<h3>How To Use</h3>

<pre>
import {Discovery} from 'linq-discovery'

const UDP_PORT = 7123 // Default Port used

const disco = new Discovery(UDP_PORT)
  .on('new', (device) => {                    // New device discovered
    console.dir(device)
  })
  .on('message', (device) => {                // Un-filtered UDP message received
    console.log(`${JSON.stringify(device)}`)
  })

</pre>

<h3>Console Output Example</h3>
<pre>
Device {
  product: 'linq2',
  id: 'cCzyUmwbgItEvWvzIesdoF-7seAUjH79LGC5zfTyqfs=',
  ip: '192.168.1.57',
  http: 80,
  https: 443,
  mqtt: 1883,
  mqtts: 8883
}
</pre>

<h3>To get a list of devices discovered since application started</h3>
<pre>
let array_of_devices = disco.get_devices()
</pre>

<h3>To clear the list of devices discovered</h3>
<pre>
disco.clear()
</pre>
