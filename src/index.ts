import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import API from './API'

dotenv.config()

const init = async () => {
  try {
    const welcomePath = path.join(__dirname, 'welcome.txt')
    const welcomeBuffer = await fs.promises.readFile(welcomePath)
    console.log(welcomeBuffer.toString())
  } catch (e) {
    console.error(e)
  }

  const host: string = process.env.HA_HOST || ''
  const token: string = process.env.HA_TOKEN || ''
  try {
    API.getInstance()
  } catch (e) {
    console.error(e)
  }
}

init()
  .catch((e) => {
    console.error(e)
  })