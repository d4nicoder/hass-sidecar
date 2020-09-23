const ws = jest.createMockFromModule('ws');

import {
  EventEmitter
} from 'events'

class ws {
  constructor(uri) {
    this._onceCallback = null
    this.uri = uri
    this._events = new EventEmitter()
    this._listeners = {}

    this._messages = []
  }

  once(ev, callback) {
    this._events.addListener(ev, callback)
    this._events.emit(ev)
  }

  on(ev, callback) {
    // Dummy function 
    this._events.addListener(ev, callback)
  }


  send(message) {
    this._events.emit('message', {
      id: message.id || new Date().getTime(),
      type: 'auth_ok'
    })
    return true
  }
}

module.exports = ws