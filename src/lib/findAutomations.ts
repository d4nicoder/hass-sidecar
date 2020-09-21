import fs from 'fs'
import path from 'path'

type IOptions = {
  filter?: (file: string) => Promise<boolean> | boolean
  recursive?: boolean
}

const findAutomations = async (dir: string, options?: IOptions): Promise<string[]> => { 
  if (!options) {
    options = {
      recursive: false
    }
  }
  
  let files: string[] = []
  // Check is a dir
  try {
    const stat = await fs.promises.stat(dir)
    if (!stat.isDirectory()) {
      return []
    }
  } catch (e) {
    console.error(e)
    return []
  }

  // Get dir content
  let content
  try {
    content = await fs.promises.readdir(dir)
  } catch (e) {
    console.error(e)
    return []
  }

  for (const file of content) {
    const filePath = path.join(dir, file)   

    try {
      const stat = await fs.promises.stat(filePath)
      if (stat.isFile()) {
        if (options.filter) {
          try {
            const allowed = await options.filter(filePath)
            if (!allowed) {
              continue
            } else {
              files.push(filePath)
            }
          } catch (e) {
            console.error(e)
            continue
          }
        } else {
          files.push(filePath)
        }
      } else if (!options.recursive) {
        continue
      }
    } catch (e) {
      console.error(e)
      continue
    }
    // Recusrive iteration
    try {
      const founded = await findAutomations(filePath, options)
      files = files.concat(founded)
    } catch (e) {
      console.error(e)
      continue
    }
 }

  
  return files.sort()
}

export default findAutomations

