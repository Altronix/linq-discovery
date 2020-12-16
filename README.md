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
  console.log(device)
})

async function main() {
  disco.start(4000) // Start listening and poll every 4000 milliseconds
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
</pre>

<h3>Console Output Example</h3>
<pre>
Device {
  product: 'linqm5',
  id: 'a20967c9b7a4d114ad05e31d91975a36',
  ip: '192.168.1.16',
  port: 80
}
</pre>
