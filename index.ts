import 'dotenv/config'

import { runAgent } from './src/agent'
import { tools } from './src/tools'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your message: ', async (userMessage) => {
  if (!userMessage.trim()) {
    console.error('Message cannot be empty')
    process.exit(1)
  }

  await runAgent({ 
    message: userMessage, 
    tools 
  })

  rl.close()
});
