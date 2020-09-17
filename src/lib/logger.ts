import moment from 'moment'

export default (text: any) => {
  let textStr
  if (typeof text === 'string') {
    textStr = text
  } else if (typeof text === 'object') {
    try {
      textStr = JSON.stringify(text, null, '\t')
    } catch (e) {
      console.error(e)
      return
    }
  }
  console.log(`\x1b[34m${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}\x1b[0m - ${textStr}`)
}