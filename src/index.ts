import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import API from './API'
import Logger from './lib/Logger';

dotenv.config()

const init = async () => {
  try {
    const welcomePath = path.join(__dirname, 'welcome.txt')
    const welcomeBuffer = await fs.promises.readFile(welcomePath)
    // tslint:disable-next-line: no-console
    console.log(welcomeBuffer.toString())
  } catch (e) {
    Logger.error(e)
  }

  const host: string = process.env.HA_HOST || ''
  const token: string = process.env.HA_TOKEN || ''
  try {
    API.getInstance()
  } catch (e) {
    Logger.error(e)
  }
}

init()
  .catch((e) => {
    Logger.error(e)
  })