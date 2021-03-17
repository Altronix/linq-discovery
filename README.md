# linq-discovery

npm library to discover linq devices

<h3>Install</h3>
<pre>yarn add linq-discovery</pre> 
or
<pre>npm i linq-discovery</pre>

<h3>How To Use</h3>

<pre>
import {Discovery} from 'linq-discovery'

const disco = new Discovery().on('new', async (device) => {
  console.dir(device)
})

async function main() {
  disco.start(7123) // Start discovering in port 7123
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
</pre>

<h3>Console Output Example</h3>
<pre>
Device {
  product: 'linq2',
  id: 'cCzyUmwbgItEvWvzIesdoF-7seAUjH79LGC5zfTyqfs=',
  ip: '192.168.1.57',
  http: 80,
  https: 443
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
